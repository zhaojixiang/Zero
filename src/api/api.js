import axios from '../utils/axios'

const baseUrl = 'http://192.168.100.174:85' // 韩国奇 ip 地址
const newTask = 'http://192.168.100.174:31109' // 韩国奇 ip 地址
const dataReplay = 'http://192.168.100.166:31109' // 雷和军 ip 地址
const stationShowUrl = 'http://192.168.100.48:31109' // 谢城 ip 地址
const stationShowUrl2 = 'http://192.168.100.48:31109' // 陈宗明 ip 地址
const stationManage = 'http://192.168.100.48:31109' // 陈宗明 ip 地址

export const request = {
	// 登陆
	login:param => {
		return axios.post(`${stationManage}/api/Login/Login`,param)
	},
	// 用户管理
	userManage:{
		// 获取全部用户信息
		getAllAccount: param => {
			return axios.get(`${stationManage}/api/Account/GetAllAccount`,param)
		},
		// 获取城市列表
		getCitys: () => {
			return axios.get(`${stationManage}/api/Account/GetCitys`)
		},
		// 新增用户
		addAccount: param => {
			return axios.post(`${stationManage}/api/Account/AddAccount`, param)
		},
		// 修改用户
		alterAccount: param => {
			return axios.post(`${stationManage}/api/Account/AlterAccount`, param)
		},
		// 删除用户
		deleteAccount: param => {
			return axios.post(`${stationManage}/api/Account/deleteAccount`, param)
		},
	},
  	// 频谱评估分析
  	spectrumEvaluation: {
    	// 新 API
		// 1 业务频段
		GetBusinessBand: params => {
			return axios.get(`${baseUrl}/api/SpectrumAssessment/GetBusinessBand`, params)
		},
		// 2 固定站&&占用度
		StationAndCover: {
			// 2.1 获取某个站的频段占用度
			GetStationChannel: params => {
				return axios.get(`${baseUrl}/api/SpectrumAssessment/GetStationChannel`, params)
			},
			// 2.2 获取固定站列表和相关频段占用度（占用度暂时为虚拟值）
			GetStationList: params => {
				return axios.get(`${baseUrl}/api/SpectrumAssessment/GetStationList`, params)
			},
			// 2.3 获取某个固定站在指定时断段内的数据天数（暂时未模拟数据）
			GetStationDays: params => {
				return axios.get(`${baseUrl}/api/SpectrumAssessment/GetStationDays`, params)
			},
			// 2.4 获取固定时间的瀑布图数据(暂时未模拟数据)
			GetWaterfallPlot: params => {
				return axios.get(`${baseUrl}/api/SpectrumAssessment/GetWaterfallPlot`, params)
			},
			// 2.5 获取指定频率的24小时占用度情况
			GetOnedayOccupy: params => {
				return axios.get(`${baseUrl}/api/SpectrumAssessment/GetOnedayOccupy`, params)
			},
			// 2.6 获取信道使用情况（暂为模拟数据）
			GetChannelUsage: params => {
				return axios.get(`${baseUrl}/api/SpectrumAssessment/GetChannelUsage`, params)
			},
			// 2.7 获取当前选择信道附近的固定站名称（暂为模拟数据）
			GetNearbyStation: params => {
				return axios.get(`${baseUrl}/api/SpectrumAssessment/GetNearbyStation`, params)
			},
			//  2.8 获取信道附近的固定站信息（暂为模拟数据）
			GetStationInfo: params => {
				return axios.get(`${baseUrl}/api/SpectrumAssessment/GetStationInfo`, params)
			},
			// 2.9 频谱地图
			GetSpectrumMap: params => {
				return axios.get(`${baseUrl}/api/SpectrumAssessment/GetSpectrumMap`, params)
			},
		},
		// 3 网格占用度（Grid）
		// 3.1 获取频段占用度计算
		GetGrid: params => {
			return axios.get(`${baseUrl}/api/SpectrumAssessment/GetGrid`, params)
		},
		// 3.2 获取频段占用度区间(饼状图)
		GetRangeOfGrid: params => {
		return axios.get(`${baseUrl}/api/SpectrumAssessment/GetRangeOfGrid`, params)
		},
		// 4 能量轨迹
		GetTrace: params => {
			return axios.get(`${baseUrl}/api/SpectrumAssessment/GetTrace`, params)
		},
		// 5 信号分析-频率列表（判断信号合法性）
		getFreqList: params => {
			return axios.get(`${baseUrl}/api/SpectrumAssessment/GetFreqList`, params)
		},
		// 6 信号覆盖率(柱状图)
		GetSignalCover: params => {
			return axios.get(`${baseUrl}/api/SpectrumAssessment/GetSignalCover`, params)
		},
		// 执行分析
		GetStartAnalysis: params => {
			return axios.get(`${baseUrl}/api/SpectrumAssessment/GetStartAnalysis`, params)
		},
		// 查询频谱图
		GetTraceSpertrum: params => {
			return axios.get(`${baseUrl}/api/SpectrumAssessment/GetTraceSpertrum`, params)
		},
    // 新增任务
    // 加载省份
    GetProvinceList: () => {
      return axios.get(`${baseUrl}/api/TaskManagement/GetProvinceList`)
    },
    // 加载城市
    GetCityList: params => {
      return axios.get(`${baseUrl}/api/TaskManagement/GetCityList`, params)
    },
    // 获取业务频段
    GetBandList: () => {
      return axios.get(`${baseUrl}/api/TaskManagement/GetBandList`)
    },
    // 获取业务频段
    NewTask: params => {
      return axios.post(`${baseUrl}/api/TaskManagement/NewTask`, params)
    },
    // 获取业务列表
    GetAllTaskList: params => {
      return axios.get(`${baseUrl}/api/TaskManagement/GetAllTaskList`, params)
    },
    // 获取业务列表
    GetTaskInfo: params => {
      return axios.get(`${baseUrl}/api/TaskManagement/GetTaskInfo`, params)
    },
    // 获取业务列表
    GetDeleteTask: params => {
      return axios.post(`${baseUrl}/api/TaskManagement/GetDeleteTask`, params)
    }
    // 删除业务管理列表数据
    // DeleteTask: params => {
    //   return axios.get(`${baseUrl}/api/TaskManagement/GetDeleteTask`, params)
    // }
	},
	// 台站显示
	stationShow: {
		// 获取城市台站数量
		GetCityTotalCount: params => {
		return axios.get(`${stationShowUrl2}/api/Station/GetCityTotalCount`, params)
		},
		// 获取业务频段
		GetBusiness: params => {
		return axios.get(`${stationShowUrl2}/api/Station/GetBusiness`, params)
		},
		// 获取台站的类型
		GetStationTypes: params => {
		return axios.get(`${stationShowUrl2}/api/Station/GetStationTypes`, params)
		},
		// 获取台站的技术类别
		GetTechnologyTypes: params => {
		return axios.get(`${stationShowUrl2}/api/Station/GetTechnologyTypes`, params)
		},
		// 分页
		GetStation: params => {
		return axios.get(`${stationShowUrl2}/api/Station/GetStation`, params)
		},
		// marker
		GetDisPlayStation: params => {
		return axios.get(`${stationShowUrl2}/api/Station/GetDisPlayStation`, params)
		},
		// popup中的详细信息
		GetDetailInfo: params => {
		return axios.get(`${stationShowUrl2}/api/Station/GetDetailInfo`, params)
		}
	},
	// 用户部分
	user: {
		login: params => {
		return axios.get('http://192.168.100.48:55601/api/Account/Login', params)
		},
		verify: params => {
		return axios.get('http://192.168.100.48:55601/api/Users/UsersTest', params)
		}
	},
	// 数据回放
	dataReply: {
		// 业务频段获取
		getBusiness: () => {
		return axios.get(`${dataReplay}/api/DataPlayback/GetBussiness`)
		},
		//查询城市列表
		getCitys: () => {
		return axios.get(`${dataReplay}/api/DataPlayback/GetCitys`)
		},
		//获取站信息
		getStationInfo: param => {
		return axios.get(`${dataReplay}/api/DataPlayback/GetStationInfo`, param)
		},
		//获取能量轨迹
		getTrace: param => {
		return axios.get(`${dataReplay}/api/DataPlayback/GetTrace`, param)
		},
		getTraceSpectrum: param => {
		return axios.get(`${dataReplay}/api/DataPlayback/GetTraceSpectrum`, param)
		},
	},
	// 信号多维分析
	SignalAnalysis: {
		// 自定义频段
		// 执行分析
		GetBeginStart: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetBeginStart`, params)
		},
		// 频段频谱地图
		GetFreqBandSpectrumMap: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFreqBandSpectrumMap`, params)
		},
		// 网格占用度
		GetGridOccupancy: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetGridOccupancy`, params)
		},
		// 频段能量轨迹
		GetFreqBandTrace: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFreqBandTrace`, params)
		},
		// 频段频谱图
		GetFreqBandSpectrogram: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFreqBandSpectrogram`, params)
		},
		// 频率列表
		GetFreqList: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFreqList`, params)
		},
		// 频率信息
		GetFreqInfo: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFreqInfo`, params)
		},
		// 固定站列表
		GetFixedStationList: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFixedStationList`, params)
		},
		// 固定站信息
		GetFixedStationInfo: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFixedStationInfo`, params)
		},
		// 固定站信道占用度
		GetFixedStationChannel: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFixedStationChannel`, params)
		},
		// 固定站数据日期
		GetFixedStationDate: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFixedStationDate`, params)
		},
		// 固定站数据日期
		GetFixedStationHour: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFixedStationHour`, params)
		},
		// 单频
		// 频率类型
		GetFreqType: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFreqType`, params)
		},
		// 频谱地图
		GetFreqSpectrogram: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFreqSpectrogram`, params)
		},
		// 能量轨迹
		GetFreqTrace: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetFreqTrace`, params)
		},
		// 覆盖范围、覆盖率、覆盖率变化趋势
		GetCoverage: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetCoverage`, params)
		},
		//  最大电平位置
		GetLevelPosition: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetLevelPosition`, params)
		},
		//  GetMaxSignalStationList
		GetMaxSignalStationList: params => {
			return axios.get(`${baseUrl}/api/SignalAnalysis/GetMaxSignalStationList`, params)
		}
	},
	stationManage:{
		getDateType:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetDateType`,param)},
		getBandSignalUsageInfo:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetBandSignalUsageInfo`,param)},
		getBandChannelUsageInfo:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetBandChannelUsageInfo`,param)},
		getBandSpectrumMap:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetBandSpectrumMap`,param)},
		getBandTrace:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetBandTrace`,param)},
		getNetOccuy:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetNetOccuy`,param)},
		getTraceSpertrum:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetTraceSpertrum`,param)},
		getBandFixStations:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetBandFixStations`,param)},
		getFixStDays:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetFixStDays`,param)},
		getFixWaterfall:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetFixWaterfall`,param)},
		getChannelFixStations:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetChannelFixStations`,param)},
		getFixStsDays:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetFixStsDays`,param)},
		getStPowerVariety:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetStPowerVariety`,param)},
		getChannelTrace:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetChannelTrace`,param)},
		getChannelSpectrumMap:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetChannelSpectrumMap`,param)},
		getMultiChStUsage:(cid,sids,time,param)=>{ return axios.post(`${stationManage}/api/FreqStation/GetMultiChStUsage?cid=${cid}&sids=${sids}&time=${time}`,param)},
		getSpanFixStsDays:param=>{ return axios.get(`${stationManage}/api/FreqStation/GetSpanFixStsDays`,param)},
	},
	// 频谱评估基站分析
	stationAnalyse:{
		// 所有基站信息
		GetAllStationInfo: param => { return axios.get(`${baseUrl}/api/SpectrumStation/GetAllStationInfo`, param ) },
		// 正常基站信息
		getNormalStationInfo: param => { return axios.get(`${baseUrl}/api/SpectrumStation/GetNormalStationInfo`, param ) },
		// 异常基站信息
		getErrorStationInfo: param => { return axios.get(`${baseUrl}/api/SpectrumStation/GetAbnormalStationInfo`, param ) },
		// 未登记基站信息
		getUnregStationInfo: param => { return axios.get(`${baseUrl}/api/SpectrumStation/GetUnregisteredStationInfo`, param ) },
		// 运营商占频统计
		GetOperatorOccupyFreq: param => { return axios.get(`${baseUrl}/api/SpectrumStation/GetOperatorOccupyFreq`, param ) },
		// 技术体制占频统计
		GetTechnologyOccupyFreq: param => { return axios.get(`${baseUrl}/api/SpectrumStation/GetTechnologyOccupyFreq`, param ) },
		// 技术体制占频带宽
		GetTechnologyOccupyBandwidth: param => { return axios.get(`${baseUrl}/api/SpectrumStation/GetTechnologyOccupyBandwidth`, param ) },
		// 运营商各种技术体制占频统计
		GetOperatorTechnologyOccupyFreq: param => { return axios.get(`${baseUrl}/api/SpectrumStation/GetOperatorTechnologyOccupyFreq`, param ) },
		// 运营商基站数量统计
		GetOperatorStationAmount: param => { return axios.get(`${baseUrl}/api/SpectrumStation/GetOperatorStationAmount`, param ) },
	}
}
