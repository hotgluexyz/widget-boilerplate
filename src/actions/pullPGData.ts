'use server'

import { Pool } from 'pg'

export async function pullPGData(tableName: string, isoTimeColumn: string) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    const query = `
      SELECT 
        TO_CHAR(${isoTimeColumn}, 'Month') as month,
        COUNT(*) as records
      FROM ${tableName}
      WHERE ${isoTimeColumn} >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY TO_CHAR(${isoTimeColumn}, 'Month'), EXTRACT(MONTH FROM ${isoTimeColumn})
      ORDER BY EXTRACT(MONTH FROM ${isoTimeColumn})
    `
    console.log(query)

    const result = await pool.query(query)
    
    // Transform the data to match the expected format
    const chartData = result.rows.map(row => ({
      month: row.month.trim(), // Remove extra spaces from TO_CHAR output
      records: parseInt(row.records)
    }))

    return chartData
  } catch (error) {
    console.error('Error fetching data from PostgreSQL:', error)
    return null
  } finally {
    await pool.end()
  }
}