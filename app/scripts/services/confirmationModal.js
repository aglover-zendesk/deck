'use strict';

require('../app');
var angular = require('angular');

angular.module('deckApp')
  .factory('confirmationModalService', function($modal) {
    var defaults = {
      buttonText: 'Confirm'
    };

    function confirm(params) {
      params = angular.extend(angular.copy(defaults), params);

      var modalArgs = {
        templateUrl: 'views/modal/confirm.html',
        controller: 'ConfirmationModalCtrl as ctrl',
        resolve: {
          params: function() {
            return params;
          }
        }
      };

      if (params.size) {
        modalArgs.size = params.size;
      }
      return $modal.open(modalArgs).result;
    }

    return {
      confirm: confirm
    };
  })
  .controller('ConfirmationModalCtrl', function($scope, accountService, $modalInstance, params) {
    $scope.params = params;

    $scope.verification = {
      requireAccountEntry: accountService.challengeDestructiveActions(params.account),
      verifyAccount: ''
    };

    this.confirm = function () {
      $modalInstance.close(true);
    };

    this.cancel = function () {
      $modalInstance.dismiss();
    };
  });
