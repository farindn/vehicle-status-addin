export async function fetchFromGeotab(method, params, creds) {
  const serverHost = creds.server || window.location.hostname;
  const rpcUrl = `https://${serverHost}/apiv1`;
  const payload = {
    method: method,
    params: {
      ...params,
      credentials: {
        database: creds.database,
        sessionId: creds.sessionId,
        userName: creds.userName,
      },
    },
  };
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`API call failed: ${response.statusText}`);
  const json = await response.json();
  if (json.error) throw new Error(json.error.message || "Unknown API error");
  return json.result || [];
}

export async function fetchAllDevices(creds, groupIds) {
  let allResults = [];
  const resultsLimit = 5000;
  let offsetName = null;
  let lastId = null;

  const groupFilter = groupIds
    ? groupIds.split(",").map((id) => ({ id: id.trim() }))
    : [];

  while (true) {
    const searchParams = { fromDate: new Date().toISOString() };
    if (groupFilter.length > 0) searchParams.groups = groupFilter;

    const params = {
      typeName: "Device",
      search: searchParams,
      resultsLimit: resultsLimit,
      sort: { sortBy: "name", sortDirection: "asc" },
    };
    if (offsetName !== null) {
      params.sort.offset = offsetName;
      params.sort.lastId = lastId;
    }

    const devices = await fetchFromGeotab("Get", params, creds);
    if (devices && devices.length > 0) {
      allResults.push(...devices);
      if (devices.length < resultsLimit) break;
      const lastDevice = devices[devices.length - 1];
      offsetName = lastDevice.name;
      lastId = lastDevice.id;
    } else {
      break;
    }
  }
  return allResults;
}

export async function calculateFleetMetrics(allDevices, creds) {
  const totalFleet = allDevices.length;
  if (totalFleet === 0)
    return { total: 0, driving: 0, stopped: 0, offline: 0, untracked: 0 };

  const deviceIds = allDevices.map((d) => ({ id: d.id }));
  const statusResults = await fetchFromGeotab(
    "Get",
    {
      typeName: "DeviceStatusInfo",
      search: {
        deviceSearch: { ids: deviceIds },
        excludeUntrackedAssets: true,
      },
    },
    creds
  );

  const statusMap = new Map();
  statusResults.forEach((s) => statusMap.set(s.device.id, s));

  let driving = 0;
  let stopped = 0;
  let offline = 0;
  let untracked = 0;

  allDevices.forEach((device) => {
    const status = statusMap.get(device.id);

    if (!status) {
      untracked++;
    } else if (status.isDeviceCommunicating === false) {
      offline++;
    } else if (status.isDriving === true) {
      driving++;
    } else {
      stopped++;
    }
  });

  return { total: totalFleet, driving, stopped, offline, untracked };
}
