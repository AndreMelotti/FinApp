"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartComponentProps {
  data: Array<{
    name: string
    income: number
    expenses: number
  }>
}

export default function ChartComponent({ data }: ChartComponentProps) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#22c55e" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
