<script setup lang="ts">
import { Card } from "@edmi-vue/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@edmi-vue/ui/table";

const rows = [
  { symbol: "NVDAx", name: "NVIDIA", price: "$188.20", weight: "32.0%", day: "+2.41%", up: true },
  { symbol: "MSFTx", name: "Microsoft", price: "$512.10", weight: "28.0%", day: "+0.88%", up: true },
  { symbol: "AAPLx", name: "Apple", price: "$231.45", weight: "24.0%", day: "-0.62%", up: false },
  { symbol: "ANTHRP-pre", name: "Anthropic pre-IPO", price: "$61.30", weight: "16.0%", day: "+4.10%", up: true },
];
</script>

<template>
  <Card class="w-full max-w-xl py-0">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead numeric>Price</TableHead>
          <TableHead numeric>Weight</TableHead>
          <TableHead numeric>24h</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="r in rows" :key="r.symbol">
          <TableCell>
            <div class="font-medium">{{ r.symbol }}</div>
            <div class="text-[11.5px] text-muted-foreground">{{ r.name }}</div>
          </TableCell>
          <TableCell numeric>{{ r.price }}</TableCell>
          <TableCell numeric>{{ r.weight }}</TableCell>
          <TableCell numeric :trend="r.up ? 'up' : 'down'">{{ r.day }}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total · 4 tokens</TableCell>
          <TableCell numeric>NAV $0.9998</TableCell>
          <TableCell numeric>100%</TableCell>
          <TableCell numeric trend="up">+0.53%</TableCell>
        </TableRow>
      </TableFooter>
      <TableCaption>Weights as of the last rebalance.</TableCaption>
    </Table>
  </Card>
</template>
