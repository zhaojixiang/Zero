
import axios from '../utils/axios'

const baseUrl = 'http://192.168.100.174:54276' // 韩国奇 ip 地址

export const request = {
    // 频谱评估分析
    spectrumEvaluation:{
        // 新 API
         // 1 业务频段
        GetBusinessBand:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetBusinessBand`,params)},
        // 2 固定站&&占用度
        StationAndCover:{
            // 2.1 获取某个站的频段占用度
            GetChannelOfStation:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetChannelOfStation`,params)},
            // 2.2 获取固定站列表和相关频段占用度（占用度暂时为虚拟值）
            GetStation:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetStation`,params)},
            // 2.3 获取某个固定站在指定时断段内的数据天数（暂时未模拟数据）
            GetDaysOfTimePeriod:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetDaysOfTimePeriod`,params)},
            // 2.4 获取固定时间的瀑布图数据(暂时未模拟数据)
            GetWaterfallPlot:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetWaterfallPlot`,params)},
            // 2.5 获取指定频率的24小时占用度情况
            GetChannelOfFreqInOneday:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetChannelOfFreqInOneday`,params)}
        },
        // 3 网格占用度（Grid）
        GetGrid:{
            // 3.1 获取频段占用度计算
            GetGridCalculate:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetGridCalculate`,params)},
            // 3.2 获取频段占用度区间(饼状图)
            GetRangeOfGrid:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetRangeOfGrid`,params)}
        },
        // 4 能量轨迹
        GetTrace:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetTrace`,params)},
        // 5 信号分析
        GetSignalCalculate:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetSignalCalculate`,params)}, 
        // 6 信号覆盖率
        GetTraceSpertrum:params => { return axios.get(`${baseUrl}/api/SpectrumData/GetSignalCover`,params)},
        // 旧 API


        // 1 数据轨迹
        // 1.1 查询轨迹
        GetSignalCover:params => { return axios.get(`${baseUrl}/api/SpectrumResult/GetTrace`,params)},
        // 1.2 查询频谱图
        GetTraceSpertrum:params => { return axios.get(`${baseUrl}/api/SpectrumResult/GetTraceSpertrum`,params)},
        // 2 频谱地图（Map）
        GetMap:params => { return axios.get(`${baseUrl}/api/SpectrumResult/GetMap`,params)},
        // 3 信道占用度（Channel）
        Channel:{
            // 3.1 查询信道
            GetChannel:params => { return axios.get(`${baseUrl}/api/SpectrumResult/GetChannel`,params)},
            // 3.2 查询基站
            GetStation:params => { return axios.get(`${baseUrl}/api/SpectrumResult/GetStation`,params)}
        },
        // 4. 网格占用度（Grid）
        GetGrid:params => { return axios.get(`${baseUrl}/api/SpectrumResult/GetGrid`,params)},
        // 5. 信号覆盖率（Signal）
        GetSignal:params => { return axios.get(`${baseUrl}/api/SpectrumResult/GetSignal`,params)},
    }
}