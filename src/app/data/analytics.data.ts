import { AnalyticsKpi } from '../core/models/portfolio.models';

export const ANALYTICS_KPIS: AnalyticsKpi[] = [
  {
    label: 'Overall OEE',
    value: '87.4%',
    trend: '+3.2% vs target',
    isPositive: true,
    description: 'World-class manufacturing baseline composite index.'
  },
  {
    label: 'Availability',
    value: '92.1%',
    trend: '+1.5% uptime',
    isPositive: true,
    description: 'Planned operating time vs actual runtime.'
  },
  {
    label: 'Performance Rate',
    value: '95.6%',
    trend: '+0.8% cycle speed',
    isPositive: true,
    description: 'Ratio of net operating rate to ideal cycle time.'
  },
  {
    label: 'Quality Yield',
    value: '99.2%',
    trend: '-0.3% scrap rate',
    isPositive: true,
    description: 'First-pass good parts out of total units produced.'
  }
];

export const DEMO_CHART_DATA = {
  productionTrend: {
    labels: ['Shift A (06:00)', 'Shift A (09:00)', 'Shift A (12:00)', 'Shift B (15:00)', 'Shift B (18:00)', 'Shift B (21:00)', 'Shift C (00:00)', 'Shift C (03:00)'],
    planned: [120, 240, 360, 480, 600, 720, 840, 960],
    actual: [125, 238, 372, 490, 615, 710, 855, 975]
  },
  qualityDefects: {
    labels: ['Dimensional Variance', 'Surface Scratches', 'Improper Alignment', 'Thermal Warpage', 'Assembly Tolerance'],
    counts: [14, 28, 9, 6, 12]
  },
  machineEfficiency: {
    labels: ['CNC Milling #1', 'CNC Milling #2', 'Injection Molding #1', 'Robotic Welder #1', 'Automated Inspector'],
    rates: [92, 88, 95, 91, 98]
  }
};

