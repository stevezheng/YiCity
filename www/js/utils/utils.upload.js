(function () {
  'use strict';

  angular
    .module('utils.upload', [])
    .directive('utilsUpload', utilsUpload);

  utilsUpload.$inject = [];
  function utilsUpload() {
    return {
      replace: false,
      restrict: 'AE',
      link: function (scope, elem, attrs) {

        scope.browseFile = function () {
          document.getElementById('browseBtn').click();
        };

        angular.element(document.getElementById('browseBtn')).on('change', function (e) {

          var file = e.target.files[0];

          angular.element(document.getElementById('browseBtn')).val('');
          var name = 'photo.jpg';

          var avFile = new AV.File(name, file);
          avFile.save()
            .then(function(res) {
              scope.$apply(function() {
                scope.cUser.image = res._url;
                scope.cUser.set('image', res._url);
                scope.cUser.save();
              });
            }, function(error) {
            });
        });

      },
      templateUrl: 'templates/utils/upload-file.html'
    };
  }
})();