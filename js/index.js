$(function () {
  // 监控区域模块
  ; (function () {
    $(".monitor .tabs").on("click", "a", function () {
      $(this).addClass("active").siblings("a").removeClass("active");
      $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
    })
    $(".marquee-view .marquee").each(function () {
      var rows = $(this).children().clone();
      $(this).append(rows);
    })
  })();
  (function () {
    var myChart = echarts.init(document.querySelector(".pie"));
    var option = {
      color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '点位统计',
          type: 'pie',
          radius: ["10%", "80%"],
          center: ['50%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 5
          },
          label: {
            fontSize: 10
          },
          labelLine: {
            // 连接扇形图线长
            length: 6,
            // 连接文字线长
            length2: 8
          },
          data: [
            { value: 20, name: '云南' },
            { value: 26, name: '北京' },
            { value: 24, name: '山东' },
            { value: 25, name: '河北' },
            { value: 20, name: '江苏' },
            { value: 25, name: '浙江' },
            { value: 30, name: '四川' },
            { value: 42, name: '湖北' }
          ]
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    })
  })();
  (function () {
    var myChart = echarts.init(document.querySelector(".bar"));
    // 中间省略的数据  准备三项
    var item = {
      name: '',
      value: 1200,
      // 柱子颜色
      itemStyle: {
        color: '#254065'
      },
      // 鼠标经过柱子颜色
      emphasis: {
        itemStyle: {
          color: '#254065'
        }
      },
      // 工具提示隐藏
      tooltip: {
        extraCssText: 'opacity:0'
      },
    };
    var option = {
      tooltip: {
        trigger: 'item'
      },
      color: new echarts.graphic.LinearGradient(
        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
        0, 0, 0, 1,
        [
          { offset: 0, color: '#00fffb' }, // 0 起始颜色
          { offset: 1, color: '#0061ce' }  // 1 结束颜色
        ]
      ),
      grid: {
        left: '0%',
        right: '3%',
        bottom: '3%',
        top: '3%',
        containLabel: true,
        show: true,
        borderColor: 'rgba(0, 240, 255, 0.3)'
      },
      xAxis: [
        {
          type: 'category',
          data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
          axisTick: {
            alignWithLabel: false,
            show: false
          },
          // x坐标轴文字标签样式设置
          axisLabel: {
            color: '#4c9bfd'
          },
          // x坐标轴颜色设置
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)',
              // width:8,  x轴线的粗细
              // opcity: 0,   如果不想显示x轴线 则改为 0
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          // 刻度设置
          axisTick: {
            // 不显示刻度
            show: false
          },
          axisLabel: {
            color: '#4c9bfd'
          },
          // y坐标轴颜色设置
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)',
              // width:8,  x轴线的粗细
              // opcity: 0,   如果不想显示x轴线 则改为 0
            }
          },
          // y轴 分割线的样式 
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)'
            }
          }
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  })();
  //订单功能
  (function () {
    // 1. 准备数据
    var data = {
      day365: { orders: '20,301,987', amount: '99834' },
      day90: { orders: '301,987', amount: '9834' },
      day30: { orders: '1,987', amount: '3834' },
      day1: { orders: '987', amount: '834' }
    };
    // 获取显示 订单数量 容器
    var $h4Orders = $('.order h4:eq(0)');
    // 获取显示 金额数量 容器
    var $h4Amount = $('.order h4:eq(1)');
    var index = 0;
    $(".order").on("click", ".filter a", function () {
      $(this).addClass("active").siblings("a").removeClass("active");
      var currdata = data[this.dataset.key];
      $h4Orders.html(currdata["orders"]);
      $h4Amount.html(currdata["amount"]);
      index = $(this).index();
    })
    var timer = setInterval(function () {
      index++;
      if (index >= 4) {
        index = 0;
      };
      $(".order .filter a").eq(index).click();
    }, 2000)
    $(".order").hover(
      function () {
        clearInterval(timer);
        timer = null;
      },
      function () {
        clearInterval(timer);
        timer = null;
        timer = setInterval(function () {
          index++;
          if (index >= 4) {
            index = 0;
          };
          $(".order .filter a").eq(index).click();
        }, 2000)
      }
    )
  })();
  //销售额统计
  (function () {
    var data = {
      year: [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
      ],
      quarter: [
        [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
        [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
      ],
      month: [
        [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
      ],
      week: [
        [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
      ]
    };
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".line"));
    // 2. 指定配置和数据
    var option = {
      tooltip: {
        trigger: "axis"
      },
      // 图例组件
      legend: {
        textStyle: {
          color: '#4c9bfd' // 图例文字颜色
        },
        right: '10%' // 距离右边10%
      },
      // 设置网格样式
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        show: true,// 显示边框
        borderColor: '#012f4a',// 边框颜色
        containLabel: true // 包含刻度文字在内
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisTick: {
          show: false // 去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd' // 文本颜色
        },
        axisLine: {
          show: false // 去除轴线
        },
        boundaryGap: false  // 去除轴内间距
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false  // 去除刻度
        },
        axisLabel: {
          color: '#4c9bfd' // 文字颜色
        },
        splitLine: {
          lineStyle: {
            color: '#012f4a' // 分割线颜色
          }
        }
      },
      color: ['#00f2f1', '#ed3f35'],
      series: [{
        name: '预期销售额',
        data: data.year[0],
        type: 'line',
        // 折线修饰为圆滑
        smooth: true,
        itemStyle: {
          color: '#00f2f1'
        }
      }, {
        name: '实际销售额',
        data: data.year[1],
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#ed3f35'
        }
      }]
    };

    // 3. 把配置和数据给实例对象
    myChart.setOption(option);
    $(".sales .caption").on("click", "a", function () {
      $(this).addClass("active").siblings("a").removeClass("active");
      var arr = this.dataset.type;
      var currdata = data[arr];
      index = $(this).index() - 1;
      option.series[0].data = currdata[0];
      option.series[1].data = currdata[1];
      myChart.setOption(option);
    })
    var index = 0;
    var timer = setInterval(function () {
      index++;
      if (index >= 4) index = 0;
      $(".sales .caption a").eq(index).click()
    }, 3000)
    $(".sales").hover(function () {
      clearInterval(timer);
    }, function () {
      clearInterval(timer);
      timer = setInterval(function () {
        index++;
        if (index >= 4) index = 0;
        $(".sales .caption a").eq(index).click()
      }, 3000)
    })
    window.addEventListener("resize", function () {
      myChart.resize();
    })
  })();
  //渠道分布
  (function () {
    var myChart = echarts.init(document.querySelector(".radar"));
    var option = {
      tooltip: {
        show: true,
        // 控制提示框组件的显示位置
        position: ['50%', '10%'],
        textStyle: {
          fontSize: 10
        }
      },
      radar: {
        indicator: [
          { name: '机场', max: 100 },
          { name: '商场', max: 100 },
          { name: '火车站', max: 100 },
          { name: '汽车站', max: 100 },
          { name: '地铁', max: 100 }
        ],
        name: {
          textStyle: {
            color: '#4c9bfd'
          }
        },

        center: ["50%", "50%"],
        radius: "50%",
        shape: 'circle',
        splitNumber: 4,
        axisName: {
          color: 'rgb(238, 197, 102)',
          fontSize: 10
        },
        splitLine: {
          lineStyle: {
            color: [
              'rgba(255,255,255,0.5)'
            ]
          }
        },
        splitArea: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.5)'
          }
        }
      },
      series: [
        {
          name: '北京',
          type: 'radar',
          lineStyle: {
            normal: {
              color: '#fff',
              width: 1,
              opacity: 0.5
            }
          },
          data: [[90, 19, 56, 11, 34]],
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: {
            color: '#fff'
          },
          label: {
            show: true,
            color: '#fff',
            fontSize: 10
          },
          areaStyle: {
            color: 'rgba(238, 197, 102, 0.6)'
          },
        }
      ]
    };
    myChart.setOption(option);
    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  })();
  //销售进度
  (function () {
    var myChart = echarts.init(document.querySelector(".gauge"));
    var option = {
      series: [
        {
          name: '销售进度',
          type: 'pie',
          radius: ['130%', '150%'],
          center: ['48%', '80%'],
          avoidLabelOverlap: false,
          startAngle: '180',
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          hoverOffset: 0,
          data: [
            {
              value: 150, itemStyle: {
                // 颜色渐变#00c9e0->#005fc1
                color: new echarts.graphic.LinearGradient(
                  // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                    { offset: 1, color: "#005fc1" } // 1 结束颜色
                  ]
                )
              }
            },
            { value: 50, itemStyle: { color: '#12274d' } },
            {
              value: 200, itemStyle: {
                color: 'transparent'
              }
            }
          ]
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  })();
  (function () {
    var hotData = [
      {
        city: '北京',  // 城市
        sales: '25, 179',  // 销售额
        flag: true, //  上升还是下降
        brands: [   //  品牌种类数据
          { name: '可爱多', num: '9,086', flag: true },
          { name: '娃哈哈', num: '8,341', flag: true },
          { name: '喜之郎', num: '7,407', flag: false },
          { name: '八喜', num: '6,080', flag: false },
          { name: '小洋人', num: '6,724', flag: false },
          { name: '好多鱼', num: '2,170', flag: true },
        ]
      },
      {
        city: '河北',
        sales: '23,252',
        flag: false,
        brands: [
          { name: '可爱多', num: '3,457', flag: false },
          { name: '娃哈哈', num: '2,124', flag: true },
          { name: '喜之郎', num: '8,907', flag: false },
          { name: '八喜', num: '6,080', flag: true },
          { name: '小洋人', num: '1,724', flag: false },
          { name: '好多鱼', num: '1,170', flag: false },
        ]
      },
      {
        city: '上海',
        sales: '20,760',
        flag: true,
        brands: [
          { name: '可爱多', num: '2,345', flag: true },
          { name: '娃哈哈', num: '7,109', flag: true },
          { name: '喜之郎', num: '3,701', flag: false },
          { name: '八喜', num: '6,080', flag: false },
          { name: '小洋人', num: '2,724', flag: false },
          { name: '好多鱼', num: '2,998', flag: true },
        ]
      },
      {
        city: '江苏',
        sales: '23,252',
        flag: false,
        brands: [
          { name: '可爱多', num: '2,156', flag: false },
          { name: '娃哈哈', num: '2,456', flag: true },
          { name: '喜之郎', num: '9,737', flag: true },
          { name: '八喜', num: '2,080', flag: true },
          { name: '小洋人', num: '8,724', flag: true },
          { name: '好多鱼', num: '1,770', flag: false },
        ]
      },
      {
        city: '山东',
        sales: '20,760',
        flag: true,
        brands: [
          { name: '可爱多', num: '9,567', flag: true },
          { name: '娃哈哈', num: '2,345', flag: false },
          { name: '喜之郎', num: '9,037', flag: false },
          { name: '八喜', num: '1,080', flag: true },
          { name: '小洋人', num: '4,724', flag: false },
          { name: '好多鱼', num: '9,999', flag: true },
        ]
      }
    ]
    var supHtml = "";
    $.each(hotData, function (index, ele) {
      supHtml += `<li>
       <span>${ele.city}</span>
      <span>${ele.sales}<s class=${ele.flag ? "icon-up" : "icon-down"}></s></span>
    </li>`;
      $(".sup").html(supHtml);
    })
    $(".province .sup").on("mouseenter", "li", function () {
      xianshi($(this));
      index = $(this).index();
    });
    var lis = $(".province .sup li");
    lis.eq(0).mouseenter();
    var index = 0;
    var timer = setInterval(function () {
      if (index >= 5) {
        index = 0;
      }
      // $(".province .sup li").eq(index).mouseenter();
      xianshi(lis.eq(index));
      index++;
    }, 1000);
    $(".province .sup").hover(function () {
      clearInterval(timer);
    }, function () {
      clearInterval(timer);
      timer = setInterval(function () {
        if (index >= 5) {
          index = 0;
        }
        // $(".province .sup li").eq(index).mouseenter();
        xianshi(lis.eq(index));
        index++;
        console.log(index);

      }, 1000);
    });
    function xianshi(that) {
      that.addClass("active").siblings().removeClass();
      var subHTML = "";
      $.each(hotData[that.index()].brands, function (index, ele) {
        subHTML += `<li><span>${ele.name}</span><span>${ele.num}<s class=${ele.flag ? "icon-up" : "icon-down"}></s></span></li>`
      })
      $(".sub").html(subHTML);
    }
  })();
})
