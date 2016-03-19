'use strict';
angular.module('page-main', [])
.directive('mainPage', function () {
  return {
    restrict:'E',
    controllerAs: 'mainCtrl',
    scope: {},
    bindToController: {},
    templateUrl: 'assets/partials/main.html',
    controller: function myCtrl(){
      var thiz = this;
      var chart = {};
      chart.options = {
        'legend': 'bottom'
      }
      chart.type = 'google.charts.Bar';
      // chart.type = 'google.visualization.ColumnChart';
      chart.data = {
        "cols": [{
          id: "month",
          label: "",
          type: "string"
        }, {
          id: "maz-id",
          label: "Mazoute",
          type: "number"
        }, {
          id: "gra-id",
          label: "Pellets",
          type: "number"
        }, {
          id: "hyg-id",
          label: "Hygienne",
          type: "number"
        }],
        "rows": [{
          c: [{
            v: "Janvier"
          }, {
            v: 19,
            //f: "42 items"
          }, {
            v: 12,
            //f: "Ony 12 items"
          }, {
            v: 7,
            //f: "7 servers"
          }]
        }, {
          c: [{
            v: "Fevrier"
          }, {
            v: 13
          }, {
            v: 1,
            //f: "1 unit (Out of stock this month)"
          }, {
            v: 12
          }]
        }, {
          c: [{
              v: "Mars"
            }, {
              v: 24
            }, {
              v: 5
            }, {
              v: 11
          }]
        }]
      };
      thiz.chartObj = chart;
    }
  }
})
