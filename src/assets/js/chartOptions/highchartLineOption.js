export default function(data) {
    return {
        chart:{
            zoomType:'x'
        },
        boost:{
            useGPUTranslations:true
        },
        title:{
            text:'频谱图'
        },
        subTitle:{
            text:'Using the Boost module'
        },
        tooltip:{
            valueDecimals:2
        },
        series:[{
            data:data,
            lineWidth:0.5
        }]
    }
}

