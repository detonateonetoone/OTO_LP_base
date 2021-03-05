angular.module('OrderCloud-HeaderNavigation', []);
angular.module('OrderCloud-HeaderNavigation')
    .directive('headernavigation', headernavigation)
    .controller('HeaderNavigationCtrl', HeaderNavigationCtrl)
;

function headernavigation() {
    return {
        restrict: 'E',
        template: template
    };

    function template() {
        return [
            '<section class="header-navigation">',
            '<div class="row">',
            '<div class="col-xs-12 col-sm-12 pull-right">',
            '<ul>',
            '<li class="search-bar"><productsearchinput></productsearchinput></li>',
            '<li class="dropdown">',
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="false">MY ACCOUNT</a>',
            '<ul class="dropdown-menu account-dropdown">',
            '<li><a href="admin">USER INFORMATION</a></li>',
            '<li><a href="addresses">ADDRESSES</a></li>',
            '<li><a href="favoriteorders">FAVORITES</a></li>',
            '<li ng-show="user.Permissions.contains(\'ViewMessaging\')"><a href="message">MESSAGES</a></li>',
            '</ul>',
            '</li>',
            '<li ng-show="user.Permissions.contains(\'ViewContactUs\')"><a href="https://support.useone2one.com" target="_blank">SUPPORT</a></li>',
            '<li ng-show="user.Permissions.contains(\'AdvancedReporting\')"><a href="reports">REPORTS</a></li>',
            '<li><a href="order">ORDERS</a></li>',
            '<li><a href="cart">CART&nbsp;',
            '<span ng-if="currentOrder.LineItems.length" ng-bind="cartCount" class="badge" style="color: #FFF; background-color: #62A9A3;"></span>',
            '</a></li>',
            '<li><a ng-click="Logout()">LOG OUT</a></li>',
            '</ul>',
            '</div>',
            '</div>',
            '</section>'
        ].join('');
    }
}

HeaderNavigationCtrl.$inject = ['$scope','User'];
function HeaderNavigationCtrl($scope, User) {

    $scope.Logout = function(){
        User.logout();
        if ($scope.isAnon) {
            $location.path("/catalog");
            User.login(function(user) {
                $scope.user = user;
            });
        }
    };

}
