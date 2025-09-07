"use client"

import { Bar, BarChart, XAxis } from "recharts"
import { useEffect, useState } from "react"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { pullPGData } from "@/actions/pullPGData"
import { FootstepsLoader } from "@/components/ui/feetLoader"

const chartConfig = {
  records: {
    label: "Records",
    color: "#2563eb",
  },
} satisfies ChartConfig

const TABLE_NAME = "contact"
const ISO_TIME_COLUMN = "createddate"


export default function GraphView({
  tenantIsLinked
}: {
  tenantIsLinked: boolean
}) {
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
      const data = await pullPGData(TABLE_NAME, ISO_TIME_COLUMN)
      if (data) {
        setChartData(data)
        setIsLoading(false)
      } else {
        setTimeout(fetchData, 5000)
      }
    }

  useEffect(() => {
    if (tenantIsLinked) {
      fetchData()
    }
  }, [tenantIsLinked])

  return (
    <div className="my-24">
      <h1 className="text-2xl mb-8">Contacts Created By Month</h1>
      {tenantIsLinked ? (
      isLoading ? <FootstepsLoader /> : (
      <ChartContainer config={chartConfig} className="min-h-[200px]">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis dataKey="month" />
          <Bar dataKey="records" fill="var(--color-records)" radius={4} />
          </BarChart>
        </ChartContainer>
      )
      ) : (
        <p>Please connect your account to view the chart</p>
      )}
    </div>
  )
}
