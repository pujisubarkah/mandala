import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { Tooltip, Legend } from 'echarts/components'

echarts.use([CanvasRenderer, PieChart, Tooltip, Legend])