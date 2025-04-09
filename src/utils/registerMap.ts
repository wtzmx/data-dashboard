import * as echarts from 'echarts';

// 中国地图的主要坐标点（简化版）
const chinaGeoCoordMap: Record<string, [number, number]> = {
  '北京': [116.46, 39.92],
  '上海': [121.48, 31.22],
  '广州': [113.23, 23.16],
  '深圳': [114.07, 22.62],
  '杭州': [120.19, 30.26],
  '南京': [118.78, 32.04],
  '武汉': [114.31, 30.52],
  '成都': [104.06, 30.67],
  '重庆': [106.54, 29.59],
  '西安': [108.95, 34.27],
  '青岛': [120.33, 36.07],
  '长沙': [112.94, 28.23],
  '郑州': [113.65, 34.76],
  '天津': [117.2, 39.13],
  '大连': [121.62, 38.92]
};

// 注册虚拟的中国地图
export const registerChinaMap = () => {
  // 注册地图
  echarts.registerMap('china', {
    type: 'FeatureCollection',
    features: Object.entries(chinaGeoCoordMap).map(([name, coords], index) => ({
      type: 'Feature',
      properties: { name },
      geometry: {
        type: 'Point',
        coordinates: coords
      },
      id: String(index)
    }))
  } as any);
};

// 获取城市坐标
export const getCityCoord = (city: string): [number, number] => {
  return chinaGeoCoordMap[city] || [0, 0];
};

export default registerChinaMap;