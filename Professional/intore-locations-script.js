const axios = require('axios');
const { Provinces, Districts, Sectors, Cells, Villages } = require('rwanda');
const { getCountries } = require('node-countries');

const BEARERTOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJNRU1CRVIiLCJTVVBFUl9BRE1JTiJdLCJhdXRob3JpdGllcyI6WyJSRUFEX1JPTEUiLCJVUERBVEVfTUVNQkVSIiwiQ1JFQVRFX1VTRVIiLCJVTkFTU0lHTl9TUEVDSUFMX0NFTEwiLCJDQU5fUkVNT1ZFX01FTUJFUl9JTl9TUEVDSUFMX0NFTEwiLCJSRUFEX0NPTlRSSUJVVElPTlMiLCJVUERBVEVfQ09OVFJJQlVUSU9OX0NBVEVHT1JZIiwiVU5BU1NJR05fTE9DQVRJT04iLCJDUkVBVEVfQ09OVFJJQlVUSU9OX1JFQVNPTiIsIkNSRUFURV9QQVlNRU5UX0dBVEVXQVkiLCJDQU5fSU1QT1JUX01FTUJFUlMiLCJERUxFVEVfRUxFQ1RJT04iLCJSRUFEX1NQRUNJQUxfQ0VMTCIsIlVQREFURV9FTEVDVElPTiIsIlVQREFURV9OT1RJRklDQVRJT05fVEVNUExBVEUiLCJSRUFEX1VTRVIiLCJSRVNFTkRfTk9USUZJQ0FUSU9OIiwiQ0FOX1JFTU9WRV9WSUxMQUdFX1NFTEZfUkVHSVNUUkFUSU9OIiwiREVMRVRFX05PVElGSUNBVElPTiIsIlJFQURfQ09OVFJJQlVUSU9OX1JFQVNPTiIsIkNSRUFURV9TUEVDSUFMX0NFTEwiLCJERUxFVEVfUk9MRSIsIlVQREFURV9DT05UUklCVVRJT05fUkVBU09OIiwiQ0FOX0FMTE9XX1ZJTExBR0VfU0VMRl9SRUdJU1RSQVRJT04iLCJERUxFVEVfQ09OVFJJQlVUSU9OX0NBVEVHT1JZIiwiREVMRVRFX0VMRUNURURfT0ZGSUNJQUwiLCJERUxFVEVfQ09NTUlUVEVFIiwiUkVBRF9QT1NJVElPTiIsIkNSRUFURV9DT01NSVRURUUiLCJDQU5fUkVNT1ZFX1JPTEVfRlJPTV9VU0VSIiwiUkVBRF9MT0dTIiwiQ1JFQVRFX0VMRUNUSU9OIiwiQ0FOX0VYUE9SVCIsIlJFQURfRUxFQ1RFRF9PRkZJQ0lBTCIsIlVQREFURV9ST0xFIiwiVVBEQVRFX1NQRUNJQUxfQ0VMTCIsIlJFQURfRUxFQ1RJT04iLCJVUERBVEVfRUxFQ1RFRF9PRkZJQ0lBTCIsIkNSRUFURV9FTEVDVEVEX09GRklDSUFMIiwiQ0FOX0FERF9NRU1CRVJfSU5fU1BFQ0lBTF9DRUxMIiwiUkVBRF9DT01NSVRURUUiLCJBU1NJR05fU1BFQ0lBTF9DRUxMIiwiVVBEQVRFX1BPU0lUSU9OIiwiQ1JFQVRFX01FTUJFUiIsIkRFTEVURV9QQVlNRU5UX0dBVEVXQVkiLCJDUkVBVEVfUE9TSVRJT04iLCJSRUFEX1BBWU1FTlRfR0FURVdBWSIsIlJFQURfTUVNQkVSIiwiQ0FOX0FTU0lHTl9ST0xFX1RPX1VTRVIiLCJERUxFVEVfTUVNQkVSIiwiUkVBRF9OT1RJRklDQVRJT04iLCJERUxFVEVfVVNFUiIsIlVQREFURV9VU0VSIiwiUkVBRF9QRVJNSVNTSU9OIiwiQ0FOX1JFSkVDVF9NRU1CRVJTSElQX1JFUVVFU1QiLCJSRUFEX05PVElGSUNBVElPTl9URU1QTEFURSIsIkNSRUFURV9DT05UUklCVVRJT05fQ0FURUdPUlkiLCJERUxFVEVfU1BFQ0lBTF9DRUxMIiwiVklFV19QRVJTT05BTF9DT05UUklCVVRJT05TIiwiQVNTSUdOX0xPQ0FUSU9OIiwiQ0FOX0FQUFJPVkVfTUVNQkVSU0hJUF9SRVFVRVNUIiwiVVBEQVRFX1BBWU1FTlRfR0FURVdBWSIsIkNSRUFURV9ST0xFIiwiVVBEQVRFX0NPTU1JVFRFRSIsIkRFTEVURV9MT0dTIiwiREVMRVRFX1BPU0lUSU9OIiwiREVMRVRFX0NPTlRSSUJVVElPTl9SRUFTT04iXSwic3ViIjoiMDc5MDA1OTk2MiIsImlhdCI6MTc0NDk4MjUyNSwiZXhwIjoxNzQ0OTkzMzI1fQ.1kGykadmMbSKUshw9Zip1u7d_GO1-47fpBNn5f1viJI";

async function createLocation(type, name, parentId = null) {
  const requestData = { name, type, parentId };
  const response = await axios.post('https://registration.intoresolutions.rw/api/locations/create', requestData, { headers: { 'Authorization': `Bearer ${BEARERTOKEN}` } });
  return response.data.data.id;
}

async function addCountries() {
  const countries = getCountries();
  for (const country of countries) {
    if (country.name !== 'Rwanda') {
      await createLocation('COUNTRY', country.name);
      console.log(`${country.name} is done`);
    }
  }
}

async function addRwandaLocations() {
  const provinces = Provinces();

  function convertProvinceName(province) {
    if (province === 'North') {
      return 'Amajyaruguru';
    }

    if (province === 'South') {
      return 'Amajyepfo';
    }

    if (province === 'West') {
        return 'Iburengerazuba';
    }

    if (province === 'East') {
        return 'Iburasirazuba';
    }

    return province;
  }

  const countries = ['Rwanda'];
  for (const country of countries) {
    const countryId = await createLocation('COUNTRY', country);
    for (const province of provinces) {
      const provinceId = await createLocation('PROVINCE', convertProvinceName(province), countryId);
      const districts = Districts(province);
      for (const district of districts) {
        const districtId = await createLocation('DISTRICT', district, provinceId);
          const sectors = Sectors(province, district);
        for (const sector of sectors) {
          const sectorId = await createLocation('SECTOR', sector, districtId);
          const cells = Cells(province, district, sector);
          for (const cell of cells) {
            const cellId = await createLocation('CELL', cell, sectorId);
              const villages = Villages(province, district, sector, cell);
            for (const village of villages) {
              await createLocation('VILLAGE', village, cellId);
            }
          }
        }
      }
      console.log('province is done');
    }
    console.log('Country is done');
  }
}

addCountries().catch((e) => console.error(e.response.data));
// addRwandaLocations().catch((e) => console.error(e.response.data));