import csv from "csv-parser"
import { createReadStream } from "node:fs"
import path from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname,"..", "data", "ip_data.CSV")

function ipToNumber(ipAddress) {
  try {
    return ipAddress
      .split(".")
      .reduce((acc, val, index) => acc + val * 256 ** (3 - index), 0)
  } catch (err) {
    console.log(err)
  }
}

function findCountryByIP(ipAddress, ipRangeData) {
  const ipValue = ipToNumber(ipAddress)

  for (const ipRange of ipRangeData) {
    const startIPValue = ipRange[0]
    const endIPValue = ipRange[1]

    if (ipValue >= startIPValue && ipValue <= endIPValue) {
      return {
        countryCode: ipRange[2],
        countryName: ipRange[3],
      }
    }
  }

  return null
}

export function GetUserInfo(ipAddress) {
  return new Promise((resolve, reject) => {
    const ipRangeData = []

    createReadStream(
        csvPath
    )
      .pipe(csv({ headers: false }))
      .on("data", (row) => {
        ipRangeData.push(row)
      })
      .on("end", () => {
        const userCountry = findCountryByIP(ipAddress, ipRangeData)

        if (userCountry) {
          resolve({
            countryCode: userCountry.countryCode,
            countryName: userCountry.countryName,
          })
        } else {
          reject(new Error("Country not found"))
        }
      })
      .on("error", (error) => {
        reject(error)
      })
  })
}
