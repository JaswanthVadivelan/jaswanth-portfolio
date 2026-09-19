import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ANALYTICS_KPIS, DEMO_CHART_DATA } from '../../data/analytics.data';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <section id="analytics" class="py-20 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold font-mono mb-3">
              <span>07</span>
              <span>/</span>
              <span>MES ANALYTICS & OEE DASHBOARD</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Production Telemetry & Quality Analytics
            </h2>
            <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Real-time operational dashboards representing Overall Equipment Effectiveness, hourly throughput variance, and defect Pareto analysis.
            </p>
          </div>

          <!-- Demo Data & Accessibility Toggle -->
          <div class="flex items-center gap-2 self-start md:self-auto">
            <span class="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-semibold">
              Demo Data
            </span>
            <button
              type="button"
              (click)="showTable.update(v => !v)"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
              [attr.aria-pressed]="showTable()"
            >
              {{ showTable() ? 'Show Visual Charts' : 'Show Data Table (Accessible)' }}
            </button>
          </div>
        </div>

        <!-- 4 KPI Summary Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          @for (kpi of kpiCards; track kpi.label) {
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
              <div class="text-xs font-medium text-slate-500 mb-1">{{ kpi.label }}</div>
              <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">{{ kpi.value }}</div>
              <div class="mt-2 text-[11px] font-semibold flex items-center gap-1" [class.text-emerald-600]="kpi.isPositive" [class.text-rose-600]="!kpi.isPositive">
                <span>{{ kpi.trend }}</span>
              </div>
              <p class="mt-1 text-[11px] text-slate-500 leading-tight">{{ kpi.description }}</p>
            </div>
          }
        </div>

        <!-- Visual Charts or Data Table View -->
        @if (!showTable()) {
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Chart 1: Plan vs Actual Production Trend (7 cols) -->
            <div class="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-base font-bold text-slate-900">Shift Throughput: Plan vs. Actual</h3>
                <span class="text-xs font-mono text-slate-400">Cumulative Units</span>
              </div>
              <div class="h-72 w-full">
                <canvas
                  baseChart
                  [data]="lineChartData"
                  [options]="lineChartOptions"
                  [type]="'line'"
                ></canvas>
              </div>
            </div>

            <!-- Chart 2: Quality Defect Breakdown (5 cols) -->
            <div class="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-base font-bold text-slate-900">Quality Defect Pareto</h3>
                <span class="text-xs font-mono text-slate-400">Recorded Incidents</span>
              </div>
              <div class="h-72 w-full">
                <canvas
                  baseChart
                  [data]="barChartData"
                  [options]="barChartOptions"
                  [type]="'bar'"
                ></canvas>
              </div>
            </div>

          </div>
        } @else {
          <!-- Accessible Data Table Alternative -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs overflow-x-auto">
            <h3 class="text-base font-bold text-slate-900 mb-4">Shift Throughput & Defect Records (Raw Data)</h3>
            
            <table class="w-full text-left text-xs border-collapse mb-6" aria-label="Shift throughput data table">
              <thead>
                <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th class="p-2.5 font-semibold">Shift Interval</th>
                  <th class="p-2.5 font-semibold">Planned Output (Units)</th>
                  <th class="p-2.5 font-semibold">Actual Output (Units)</th>
                  <th class="p-2.5 font-semibold">Variance</th>
                </tr>
              </thead>
              <tbody>
                @for (label of demoData.productionTrend.labels; track label; let idx = $index) {
                  <tr class="border-b border-slate-100 hover:bg-slate-50">
                    <td class="p-2.5 font-mono text-slate-900">{{ label }}</td>
                    <td class="p-2.5 font-mono text-slate-600">{{ demoData.productionTrend.planned[idx] }}</td>
                    <td class="p-2.5 font-mono font-semibold text-blue-600">{{ demoData.productionTrend.actual[idx] }}</td>
                    <td class="p-2.5 font-mono" [class.text-emerald-600]="demoData.productionTrend.actual[idx] >= demoData.productionTrend.planned[idx]" [class.text-rose-600]="demoData.productionTrend.actual[idx] < demoData.productionTrend.planned[idx]">
                      {{ demoData.productionTrend.actual[idx] - demoData.productionTrend.planned[idx] > 0 ? '+' : '' }}{{ demoData.productionTrend.actual[idx] - demoData.productionTrend.planned[idx] }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>

            <h4 class="text-sm font-bold text-slate-900 mb-2">Quality Inspection Defect Frequencies</h4>
            <table class="w-full text-left text-xs border-collapse" aria-label="Defect frequency data table">
              <thead>
                <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th class="p-2.5 font-semibold">Defect Type</th>
                  <th class="p-2.5 font-semibold">Count</th>
                </tr>
              </thead>
              <tbody>
                @for (defect of demoData.qualityDefects.labels; track defect; let idx = $index) {
                  <tr class="border-b border-slate-100 hover:bg-slate-50">
                    <td class="p-2.5 text-slate-900">{{ defect }}</td>
                    <td class="p-2.5 font-mono font-semibold text-slate-700">{{ demoData.qualityDefects.counts[idx] }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }

      </div>
    </section>
  `
})
export class AnalyticsComponent implements OnInit {
  readonly kpiCards = ANALYTICS_KPIS;
  readonly demoData = DEMO_CHART_DATA;
  readonly showTable = signal<boolean>(false);

  // Line Chart Configuration (Production Trend)
  readonly lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: DEMO_CHART_DATA.productionTrend.labels,
    datasets: [
      {
        data: DEMO_CHART_DATA.productionTrend.planned,
        label: 'Planned Target',
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        pointRadius: 3,
        tension: 0.3
      },
      {
        data: DEMO_CHART_DATA.productionTrend.actual,
        label: 'Actual Throughput',
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3
      }
    ]
  };

  readonly lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 11, family: 'system-ui' } } },
      tooltip: { padding: 10, cornerRadius: 8 }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } }
    }
  };

  // Bar Chart Configuration (Quality Defect Pareto)
  readonly barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: DEMO_CHART_DATA.qualityDefects.labels,
    datasets: [
      {
        data: DEMO_CHART_DATA.qualityDefects.counts,
        label: 'Defect Frequency',
        backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'],
        borderRadius: 6
      }
    ]
  };

  readonly barChartOptions: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { padding: 10, cornerRadius: 8 }
    },
    scales: {
      x: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } },
      y: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  };

  ngOnInit(): void {}
}

