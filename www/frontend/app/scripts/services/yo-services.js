(function(window, angular, undefined) {'use strict';

var urlBase = "http://yo.vsoft.vn:1234/api";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name yoServices
 * @module
 * @description
 *
 * The `yoServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("yoServices", ['ngResource']);

/**
 * @ngdoc object
 * @name yoServices.User
 * @header yoServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "User",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/users/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name yoServices.User#login
         * @methodOf yoServices.User
         *
         * @description
         *
         * Login a user with username/email and password
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/users/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#logout
         * @methodOf yoServices.User
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/users/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#confirm
         * @methodOf yoServices.User
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/users/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#resetPassword
         * @methodOf yoServices.User
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/users/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#prototype$__findById__accessTokens
         * @methodOf yoServices.User
         *
         * @description
         *
         * Find a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#prototype$__destroyById__accessTokens
         * @methodOf yoServices.User
         *
         * @description
         *
         * Delete a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#prototype$__updateById__accessTokens
         * @methodOf yoServices.User
         *
         * @description
         *
         * Update a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.topics.findById() instead.
        "prototype$__findById__topics": {
          url: urlBase + "/users/:id/topics/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.topics.destroyById() instead.
        "prototype$__destroyById__topics": {
          url: urlBase + "/users/:id/topics/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.topics.updateById() instead.
        "prototype$__updateById__topics": {
          url: urlBase + "/users/:id/topics/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.topics.link() instead.
        "prototype$__link__topics": {
          url: urlBase + "/users/:id/topics/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.topics.unlink() instead.
        "prototype$__unlink__topics": {
          url: urlBase + "/users/:id/topics/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.topics.exists() instead.
        "prototype$__exists__topics": {
          url: urlBase + "/users/:id/topics/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use User.nodebs.findById() instead.
        "prototype$__findById__nodebs": {
          url: urlBase + "/users/:id/nodebs/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.nodebs.destroyById() instead.
        "prototype$__destroyById__nodebs": {
          url: urlBase + "/users/:id/nodebs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.nodebs.updateById() instead.
        "prototype$__updateById__nodebs": {
          url: urlBase + "/users/:id/nodebs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.nodebs.link() instead.
        "prototype$__link__nodebs": {
          url: urlBase + "/users/:id/nodebs/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.nodebs.unlink() instead.
        "prototype$__unlink__nodebs": {
          url: urlBase + "/users/:id/nodebs/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.nodebs.exists() instead.
        "prototype$__exists__nodebs": {
          url: urlBase + "/users/:id/nodebs/rel/:fk",
          method: "HEAD"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#prototype$__get__accessTokens
         * @methodOf yoServices.User
         *
         * @description
         *
         * Queries accessTokens of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/users/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#prototype$__create__accessTokens
         * @methodOf yoServices.User
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#prototype$__delete__accessTokens
         * @methodOf yoServices.User
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#prototype$__count__accessTokens
         * @methodOf yoServices.User
         *
         * @description
         *
         * Counts accessTokens of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/users/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use User.topics() instead.
        "prototype$__get__topics": {
          isArray: true,
          url: urlBase + "/users/:id/topics",
          method: "GET"
        },

        // INTERNAL. Use User.topics.create() instead.
        "prototype$__create__topics": {
          url: urlBase + "/users/:id/topics",
          method: "POST"
        },

        // INTERNAL. Use User.topics.destroyAll() instead.
        "prototype$__delete__topics": {
          url: urlBase + "/users/:id/topics",
          method: "DELETE"
        },

        // INTERNAL. Use User.topics.count() instead.
        "prototype$__count__topics": {
          url: urlBase + "/users/:id/topics/count",
          method: "GET"
        },

        // INTERNAL. Use User.nodebs() instead.
        "prototype$__get__nodebs": {
          isArray: true,
          url: urlBase + "/users/:id/nodebs",
          method: "GET"
        },

        // INTERNAL. Use User.nodebs.create() instead.
        "prototype$__create__nodebs": {
          url: urlBase + "/users/:id/nodebs",
          method: "POST"
        },

        // INTERNAL. Use User.nodebs.destroyAll() instead.
        "prototype$__delete__nodebs": {
          url: urlBase + "/users/:id/nodebs",
          method: "DELETE"
        },

        // INTERNAL. Use User.nodebs.count() instead.
        "prototype$__count__nodebs": {
          url: urlBase + "/users/:id/nodebs/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#create
         * @methodOf yoServices.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/users",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#upsert
         * @methodOf yoServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/users",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#exists
         * @methodOf yoServices.User
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/users/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#findById
         * @methodOf yoServices.User
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/users/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#find
         * @methodOf yoServices.User
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/users",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#findOne
         * @methodOf yoServices.User
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/users/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#updateAll
         * @methodOf yoServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/users/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#deleteById
         * @methodOf yoServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/users/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#count
         * @methodOf yoServices.User
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/users/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#prototype$updateAttributes
         * @methodOf yoServices.User
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/users/:id",
          method: "PUT"
        },

        // INTERNAL. Use Topic.users.findById() instead.
        "::findById::Topic::users": {
          url: urlBase + "/Topics/:id/users/:fk",
          method: "GET"
        },

        // INTERNAL. Use Topic.users.destroyById() instead.
        "::destroyById::Topic::users": {
          url: urlBase + "/Topics/:id/users/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.users.updateById() instead.
        "::updateById::Topic::users": {
          url: urlBase + "/Topics/:id/users/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Topic.users.link() instead.
        "::link::Topic::users": {
          url: urlBase + "/Topics/:id/users/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Topic.users.unlink() instead.
        "::unlink::Topic::users": {
          url: urlBase + "/Topics/:id/users/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.users.exists() instead.
        "::exists::Topic::users": {
          url: urlBase + "/Topics/:id/users/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Topic.users() instead.
        "::get::Topic::users": {
          isArray: true,
          url: urlBase + "/Topics/:id/users",
          method: "GET"
        },

        // INTERNAL. Use Topic.users.create() instead.
        "::create::Topic::users": {
          url: urlBase + "/Topics/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Topic.users.destroyAll() instead.
        "::delete::Topic::users": {
          url: urlBase + "/Topics/:id/users",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.users.count() instead.
        "::count::Topic::users": {
          url: urlBase + "/Topics/:id/users/count",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.users.findById() instead.
        "::findById::Nodeb::users": {
          url: urlBase + "/Nodebs/:id/users/:fk",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.users.destroyById() instead.
        "::destroyById::Nodeb::users": {
          url: urlBase + "/Nodebs/:id/users/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.users.updateById() instead.
        "::updateById::Nodeb::users": {
          url: urlBase + "/Nodebs/:id/users/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Nodeb.users.link() instead.
        "::link::Nodeb::users": {
          url: urlBase + "/Nodebs/:id/users/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Nodeb.users.unlink() instead.
        "::unlink::Nodeb::users": {
          url: urlBase + "/Nodebs/:id/users/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.users.exists() instead.
        "::exists::Nodeb::users": {
          url: urlBase + "/Nodebs/:id/users/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Nodeb.users() instead.
        "::get::Nodeb::users": {
          isArray: true,
          url: urlBase + "/Nodebs/:id/users",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.users.create() instead.
        "::create::Nodeb::users": {
          url: urlBase + "/Nodebs/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Nodeb.users.destroyAll() instead.
        "::delete::Nodeb::users": {
          url: urlBase + "/Nodebs/:id/users",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.users.count() instead.
        "::count::Nodeb::users": {
          url: urlBase + "/Nodebs/:id/users/count",
          method: "GET"
        },

        // INTERNAL. Use TUser.user() instead.
        "::get::tUser::user": {
          url: urlBase + "/tUsers/:id/user",
          method: "GET"
        },

        // INTERNAL. Use PUser.user() instead.
        "::get::pUser::user": {
          url: urlBase + "/pUsers/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.User#getCurrent
         * @methodOf yoServices.User
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/users" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name yoServices.User#updateOrCreate
         * @methodOf yoServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name yoServices.User#update
         * @methodOf yoServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name yoServices.User#destroyById
         * @methodOf yoServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name yoServices.User#removeById
         * @methodOf yoServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name yoServices.User#getCachedCurrent
         * @methodOf yoServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link yoServices.User#login} or
         * {@link yoServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name yoServices.User#isAuthenticated
         * @methodOf yoServices.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name yoServices.User#getCurrentId
         * @methodOf yoServices.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name yoServices.User#modelName
    * @propertyOf yoServices.User
    * @description
    * The name of the model represented by this $resource,
    * i.e. `User`.
    */
    R.modelName = "User";

    /**
     * @ngdoc object
     * @name lbServices.User.topics
     * @header lbServices.User.topics
     * @object
     * @description
     *
     * The object `User.topics` groups methods
     * manipulating `Topic` instances related to `User`.
     *
     * Call {@link lbServices.User#topics User.topics()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name yoServices.User#topics
         * @methodOf yoServices.User
         *
         * @description
         *
         * Queries topics of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.topics = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::get::user::topics"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.topics#count
         * @methodOf yoServices.User.topics
         *
         * @description
         *
         * Counts topics of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.topics.count = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::count::user::topics"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.topics#create
         * @methodOf yoServices.User.topics
         *
         * @description
         *
         * Creates a new instance in topics of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.topics.create = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::create::user::topics"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.topics#destroyAll
         * @methodOf yoServices.User.topics
         *
         * @description
         *
         * Deletes all topics of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.topics.destroyAll = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::delete::user::topics"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.topics#destroyById
         * @methodOf yoServices.User.topics
         *
         * @description
         *
         * Delete a related item by id for topics
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for topics
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.topics.destroyById = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::destroyById::user::topics"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.topics#exists
         * @methodOf yoServices.User.topics
         *
         * @description
         *
         * Check the existence of topics relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for topics
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.topics.exists = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::exists::user::topics"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.topics#findById
         * @methodOf yoServices.User.topics
         *
         * @description
         *
         * Find a related item by id for topics
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for topics
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.topics.findById = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::findById::user::topics"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.topics#link
         * @methodOf yoServices.User.topics
         *
         * @description
         *
         * Add a related item by id for topics
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for topics
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.topics.link = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::link::user::topics"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.topics#unlink
         * @methodOf yoServices.User.topics
         *
         * @description
         *
         * Remove the topics relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for topics
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.topics.unlink = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::unlink::user::topics"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.topics#updateById
         * @methodOf yoServices.User.topics
         *
         * @description
         *
         * Update a related item by id for topics
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for topics
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.topics.updateById = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::updateById::user::topics"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.User.nodebs
     * @header lbServices.User.nodebs
     * @object
     * @description
     *
     * The object `User.nodebs` groups methods
     * manipulating `Nodeb` instances related to `User`.
     *
     * Call {@link lbServices.User#nodebs User.nodebs()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name yoServices.User#nodebs
         * @methodOf yoServices.User
         *
         * @description
         *
         * Queries nodebs of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.nodebs = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::get::user::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.nodebs#count
         * @methodOf yoServices.User.nodebs
         *
         * @description
         *
         * Counts nodebs of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.nodebs.count = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::count::user::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.nodebs#create
         * @methodOf yoServices.User.nodebs
         *
         * @description
         *
         * Creates a new instance in nodebs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.nodebs.create = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::create::user::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.nodebs#destroyAll
         * @methodOf yoServices.User.nodebs
         *
         * @description
         *
         * Deletes all nodebs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.nodebs.destroyAll = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::delete::user::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.nodebs#destroyById
         * @methodOf yoServices.User.nodebs
         *
         * @description
         *
         * Delete a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.nodebs.destroyById = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::destroyById::user::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.nodebs#exists
         * @methodOf yoServices.User.nodebs
         *
         * @description
         *
         * Check the existence of nodebs relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.nodebs.exists = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::exists::user::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.nodebs#findById
         * @methodOf yoServices.User.nodebs
         *
         * @description
         *
         * Find a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.nodebs.findById = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::findById::user::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.nodebs#link
         * @methodOf yoServices.User.nodebs
         *
         * @description
         *
         * Add a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.nodebs.link = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::link::user::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.nodebs#unlink
         * @methodOf yoServices.User.nodebs
         *
         * @description
         *
         * Remove the nodebs relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.nodebs.unlink = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::unlink::user::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.User.nodebs#updateById
         * @methodOf yoServices.User.nodebs
         *
         * @description
         *
         * Update a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.nodebs.updateById = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::updateById::user::nodebs"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name yoServices.Topic
 * @header yoServices.Topic
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Topic` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Topic",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Topics/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Topic.nodebs.findById() instead.
        "prototype$__findById__nodebs": {
          url: urlBase + "/Topics/:id/nodebs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Topic.nodebs.destroyById() instead.
        "prototype$__destroyById__nodebs": {
          url: urlBase + "/Topics/:id/nodebs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.nodebs.updateById() instead.
        "prototype$__updateById__nodebs": {
          url: urlBase + "/Topics/:id/nodebs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Topic.users.findById() instead.
        "prototype$__findById__users": {
          url: urlBase + "/Topics/:id/users/:fk",
          method: "GET"
        },

        // INTERNAL. Use Topic.users.destroyById() instead.
        "prototype$__destroyById__users": {
          url: urlBase + "/Topics/:id/users/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.users.updateById() instead.
        "prototype$__updateById__users": {
          url: urlBase + "/Topics/:id/users/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Topic.users.link() instead.
        "prototype$__link__users": {
          url: urlBase + "/Topics/:id/users/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Topic.users.unlink() instead.
        "prototype$__unlink__users": {
          url: urlBase + "/Topics/:id/users/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.users.exists() instead.
        "prototype$__exists__users": {
          url: urlBase + "/Topics/:id/users/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Topic.nodebs() instead.
        "prototype$__get__nodebs": {
          isArray: true,
          url: urlBase + "/Topics/:id/nodebs",
          method: "GET"
        },

        // INTERNAL. Use Topic.nodebs.create() instead.
        "prototype$__create__nodebs": {
          url: urlBase + "/Topics/:id/nodebs",
          method: "POST"
        },

        // INTERNAL. Use Topic.nodebs.destroyAll() instead.
        "prototype$__delete__nodebs": {
          url: urlBase + "/Topics/:id/nodebs",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.nodebs.count() instead.
        "prototype$__count__nodebs": {
          url: urlBase + "/Topics/:id/nodebs/count",
          method: "GET"
        },

        // INTERNAL. Use Topic.users() instead.
        "prototype$__get__users": {
          isArray: true,
          url: urlBase + "/Topics/:id/users",
          method: "GET"
        },

        // INTERNAL. Use Topic.users.create() instead.
        "prototype$__create__users": {
          url: urlBase + "/Topics/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Topic.users.destroyAll() instead.
        "prototype$__delete__users": {
          url: urlBase + "/Topics/:id/users",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.users.count() instead.
        "prototype$__count__users": {
          url: urlBase + "/Topics/:id/users/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#create
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Topics",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#upsert
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Topics",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#exists
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Topics/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#findById
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Topics/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#find
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Topics",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#findOne
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Topics/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#updateAll
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Topics/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#deleteById
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Topics/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#count
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Topics/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Topic#prototype$updateAttributes
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Topics/:id",
          method: "PUT"
        },

        // INTERNAL. Use User.topics.findById() instead.
        "::findById::user::topics": {
          url: urlBase + "/users/:id/topics/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.topics.destroyById() instead.
        "::destroyById::user::topics": {
          url: urlBase + "/users/:id/topics/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.topics.updateById() instead.
        "::updateById::user::topics": {
          url: urlBase + "/users/:id/topics/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.topics.link() instead.
        "::link::user::topics": {
          url: urlBase + "/users/:id/topics/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.topics.unlink() instead.
        "::unlink::user::topics": {
          url: urlBase + "/users/:id/topics/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.topics.exists() instead.
        "::exists::user::topics": {
          url: urlBase + "/users/:id/topics/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use User.topics() instead.
        "::get::user::topics": {
          isArray: true,
          url: urlBase + "/users/:id/topics",
          method: "GET"
        },

        // INTERNAL. Use User.topics.create() instead.
        "::create::user::topics": {
          url: urlBase + "/users/:id/topics",
          method: "POST"
        },

        // INTERNAL. Use User.topics.destroyAll() instead.
        "::delete::user::topics": {
          url: urlBase + "/users/:id/topics",
          method: "DELETE"
        },

        // INTERNAL. Use User.topics.count() instead.
        "::count::user::topics": {
          url: urlBase + "/users/:id/topics/count",
          method: "GET"
        },

        // INTERNAL. Use Topic.nodebs.findById() instead.
        "::findById::Topic::nodebs": {
          url: urlBase + "/Topics/:id/nodebs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Topic.nodebs.destroyById() instead.
        "::destroyById::Topic::nodebs": {
          url: urlBase + "/Topics/:id/nodebs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.nodebs.updateById() instead.
        "::updateById::Topic::nodebs": {
          url: urlBase + "/Topics/:id/nodebs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Topic.nodebs() instead.
        "::get::Topic::nodebs": {
          isArray: true,
          url: urlBase + "/Topics/:id/nodebs",
          method: "GET"
        },

        // INTERNAL. Use Topic.nodebs.create() instead.
        "::create::Topic::nodebs": {
          url: urlBase + "/Topics/:id/nodebs",
          method: "POST"
        },

        // INTERNAL. Use Topic.nodebs.destroyAll() instead.
        "::delete::Topic::nodebs": {
          url: urlBase + "/Topics/:id/nodebs",
          method: "DELETE"
        },

        // INTERNAL. Use Topic.nodebs.count() instead.
        "::count::Topic::nodebs": {
          url: urlBase + "/Topics/:id/nodebs/count",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.topic() instead.
        "::get::Nodeb::topic": {
          url: urlBase + "/Nodebs/:id/topic",
          method: "GET"
        },

        // INTERNAL. Use TUser.topic() instead.
        "::get::tUser::topic": {
          url: urlBase + "/tUsers/:id/topic",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name yoServices.Topic#updateOrCreate
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name yoServices.Topic#update
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name yoServices.Topic#destroyById
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name yoServices.Topic#removeById
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name yoServices.Topic#modelName
    * @propertyOf yoServices.Topic
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Topic`.
    */
    R.modelName = "Topic";

    /**
     * @ngdoc object
     * @name lbServices.Topic.nodebs
     * @header lbServices.Topic.nodebs
     * @object
     * @description
     *
     * The object `Topic.nodebs` groups methods
     * manipulating `Topic` instances related to `Topic`.
     *
     * Call {@link lbServices.Topic#nodebs Topic.nodebs()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name yoServices.Topic#nodebs
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Queries nodebs of Topic.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.nodebs = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::get::Topic::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.nodebs#count
         * @methodOf yoServices.Topic.nodebs
         *
         * @description
         *
         * Counts nodebs of Topic.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.nodebs.count = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::count::Topic::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.nodebs#create
         * @methodOf yoServices.Topic.nodebs
         *
         * @description
         *
         * Creates a new instance in nodebs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.nodebs.create = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::create::Topic::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.nodebs#destroyAll
         * @methodOf yoServices.Topic.nodebs
         *
         * @description
         *
         * Deletes all nodebs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.nodebs.destroyAll = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::delete::Topic::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.nodebs#destroyById
         * @methodOf yoServices.Topic.nodebs
         *
         * @description
         *
         * Delete a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.nodebs.destroyById = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::destroyById::Topic::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.nodebs#findById
         * @methodOf yoServices.Topic.nodebs
         *
         * @description
         *
         * Find a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.nodebs.findById = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::findById::Topic::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.nodebs#updateById
         * @methodOf yoServices.Topic.nodebs
         *
         * @description
         *
         * Update a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.nodebs.updateById = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::updateById::Topic::nodebs"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Topic.users
     * @header lbServices.Topic.users
     * @object
     * @description
     *
     * The object `Topic.users` groups methods
     * manipulating `User` instances related to `Topic`.
     *
     * Call {@link lbServices.Topic#users Topic.users()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name yoServices.Topic#users
         * @methodOf yoServices.Topic
         *
         * @description
         *
         * Queries users of Topic.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::Topic::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.users#count
         * @methodOf yoServices.Topic.users
         *
         * @description
         *
         * Counts users of Topic.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.users.count = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::count::Topic::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.users#create
         * @methodOf yoServices.Topic.users
         *
         * @description
         *
         * Creates a new instance in users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.create = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::create::Topic::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.users#destroyAll
         * @methodOf yoServices.Topic.users
         *
         * @description
         *
         * Deletes all users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.destroyAll = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::delete::Topic::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.users#destroyById
         * @methodOf yoServices.Topic.users
         *
         * @description
         *
         * Delete a related item by id for users
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.destroyById = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::destroyById::Topic::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.users#exists
         * @methodOf yoServices.Topic.users
         *
         * @description
         *
         * Check the existence of users relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.exists = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::exists::Topic::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.users#findById
         * @methodOf yoServices.Topic.users
         *
         * @description
         *
         * Find a related item by id for users
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.findById = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::findById::Topic::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.users#link
         * @methodOf yoServices.Topic.users
         *
         * @description
         *
         * Add a related item by id for users
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.link = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::link::Topic::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.users#unlink
         * @methodOf yoServices.Topic.users
         *
         * @description
         *
         * Remove the users relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.unlink = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::unlink::Topic::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Topic.users#updateById
         * @methodOf yoServices.Topic.users
         *
         * @description
         *
         * Update a related item by id for users
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.updateById = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::updateById::Topic::users"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name yoServices.Nodeb
 * @header yoServices.Nodeb
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Nodeb` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Nodeb",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Nodebs/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Nodeb.topic() instead.
        "prototype$__get__topic": {
          url: urlBase + "/Nodebs/:id/topic",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.comments.findById() instead.
        "prototype$__findById__comments": {
          url: urlBase + "/Nodebs/:id/comments/:fk",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.comments.destroyById() instead.
        "prototype$__destroyById__comments": {
          url: urlBase + "/Nodebs/:id/comments/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.comments.updateById() instead.
        "prototype$__updateById__comments": {
          url: urlBase + "/Nodebs/:id/comments/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Nodeb.step() instead.
        "prototype$__get__step": {
          url: urlBase + "/Nodebs/:id/step",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.users.findById() instead.
        "prototype$__findById__users": {
          url: urlBase + "/Nodebs/:id/users/:fk",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.users.destroyById() instead.
        "prototype$__destroyById__users": {
          url: urlBase + "/Nodebs/:id/users/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.users.updateById() instead.
        "prototype$__updateById__users": {
          url: urlBase + "/Nodebs/:id/users/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Nodeb.users.link() instead.
        "prototype$__link__users": {
          url: urlBase + "/Nodebs/:id/users/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Nodeb.users.unlink() instead.
        "prototype$__unlink__users": {
          url: urlBase + "/Nodebs/:id/users/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.users.exists() instead.
        "prototype$__exists__users": {
          url: urlBase + "/Nodebs/:id/users/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Nodeb.comments() instead.
        "prototype$__get__comments": {
          isArray: true,
          url: urlBase + "/Nodebs/:id/comments",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.comments.create() instead.
        "prototype$__create__comments": {
          url: urlBase + "/Nodebs/:id/comments",
          method: "POST"
        },

        // INTERNAL. Use Nodeb.comments.destroyAll() instead.
        "prototype$__delete__comments": {
          url: urlBase + "/Nodebs/:id/comments",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.comments.count() instead.
        "prototype$__count__comments": {
          url: urlBase + "/Nodebs/:id/comments/count",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.users() instead.
        "prototype$__get__users": {
          isArray: true,
          url: urlBase + "/Nodebs/:id/users",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.users.create() instead.
        "prototype$__create__users": {
          url: urlBase + "/Nodebs/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Nodeb.users.destroyAll() instead.
        "prototype$__delete__users": {
          url: urlBase + "/Nodebs/:id/users",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.users.count() instead.
        "prototype$__count__users": {
          url: urlBase + "/Nodebs/:id/users/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#create
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Nodebs",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#upsert
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Nodebs",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#exists
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Nodebs/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#findById
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Nodebs/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#find
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Nodebs",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#findOne
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Nodebs/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#updateAll
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Nodebs/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#deleteById
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Nodebs/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#count
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Nodebs/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#prototype$updateAttributes
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Nodebs/:id",
          method: "PUT"
        },

        // INTERNAL. Use User.nodebs.findById() instead.
        "::findById::user::nodebs": {
          url: urlBase + "/users/:id/nodebs/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.nodebs.destroyById() instead.
        "::destroyById::user::nodebs": {
          url: urlBase + "/users/:id/nodebs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.nodebs.updateById() instead.
        "::updateById::user::nodebs": {
          url: urlBase + "/users/:id/nodebs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.nodebs.link() instead.
        "::link::user::nodebs": {
          url: urlBase + "/users/:id/nodebs/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.nodebs.unlink() instead.
        "::unlink::user::nodebs": {
          url: urlBase + "/users/:id/nodebs/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.nodebs.exists() instead.
        "::exists::user::nodebs": {
          url: urlBase + "/users/:id/nodebs/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use User.nodebs() instead.
        "::get::user::nodebs": {
          isArray: true,
          url: urlBase + "/users/:id/nodebs",
          method: "GET"
        },

        // INTERNAL. Use User.nodebs.create() instead.
        "::create::user::nodebs": {
          url: urlBase + "/users/:id/nodebs",
          method: "POST"
        },

        // INTERNAL. Use User.nodebs.destroyAll() instead.
        "::delete::user::nodebs": {
          url: urlBase + "/users/:id/nodebs",
          method: "DELETE"
        },

        // INTERNAL. Use User.nodebs.count() instead.
        "::count::user::nodebs": {
          url: urlBase + "/users/:id/nodebs/count",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.comments.findById() instead.
        "::findById::Nodeb::comments": {
          url: urlBase + "/Nodebs/:id/comments/:fk",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.comments.destroyById() instead.
        "::destroyById::Nodeb::comments": {
          url: urlBase + "/Nodebs/:id/comments/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.comments.updateById() instead.
        "::updateById::Nodeb::comments": {
          url: urlBase + "/Nodebs/:id/comments/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Nodeb.comments() instead.
        "::get::Nodeb::comments": {
          isArray: true,
          url: urlBase + "/Nodebs/:id/comments",
          method: "GET"
        },

        // INTERNAL. Use Nodeb.comments.create() instead.
        "::create::Nodeb::comments": {
          url: urlBase + "/Nodebs/:id/comments",
          method: "POST"
        },

        // INTERNAL. Use Nodeb.comments.destroyAll() instead.
        "::delete::Nodeb::comments": {
          url: urlBase + "/Nodebs/:id/comments",
          method: "DELETE"
        },

        // INTERNAL. Use Nodeb.comments.count() instead.
        "::count::Nodeb::comments": {
          url: urlBase + "/Nodebs/:id/comments/count",
          method: "GET"
        },

        // INTERNAL. Use PUser.nodeb() instead.
        "::get::pUser::nodeb": {
          url: urlBase + "/pUsers/:id/nodeb",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name yoServices.Nodeb#updateOrCreate
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#update
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#destroyById
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#removeById
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name yoServices.Nodeb#modelName
    * @propertyOf yoServices.Nodeb
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Nodeb`.
    */
    R.modelName = "Nodeb";


        /**
         * @ngdoc method
         * @name yoServices.Nodeb#topic
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Fetches belongsTo relation topic
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.topic = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::get::Nodeb::topic"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Nodeb.comments
     * @header lbServices.Nodeb.comments
     * @object
     * @description
     *
     * The object `Nodeb.comments` groups methods
     * manipulating `Nodeb` instances related to `Nodeb`.
     *
     * Call {@link lbServices.Nodeb#comments Nodeb.comments()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name yoServices.Nodeb#comments
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Queries comments of Nodeb.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.comments = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::get::Nodeb::comments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.comments#count
         * @methodOf yoServices.Nodeb.comments
         *
         * @description
         *
         * Counts comments of Nodeb.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.comments.count = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::count::Nodeb::comments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.comments#create
         * @methodOf yoServices.Nodeb.comments
         *
         * @description
         *
         * Creates a new instance in comments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.comments.create = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::create::Nodeb::comments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.comments#destroyAll
         * @methodOf yoServices.Nodeb.comments
         *
         * @description
         *
         * Deletes all comments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.comments.destroyAll = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::delete::Nodeb::comments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.comments#destroyById
         * @methodOf yoServices.Nodeb.comments
         *
         * @description
         *
         * Delete a related item by id for comments
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for comments
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.comments.destroyById = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::destroyById::Nodeb::comments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.comments#findById
         * @methodOf yoServices.Nodeb.comments
         *
         * @description
         *
         * Find a related item by id for comments
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for comments
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.comments.findById = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::findById::Nodeb::comments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.comments#updateById
         * @methodOf yoServices.Nodeb.comments
         *
         * @description
         *
         * Update a related item by id for comments
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for comments
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.comments.updateById = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::updateById::Nodeb::comments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb#step
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Fetches belongsTo relation step
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        R.step = function() {
          var TargetResource = $injector.get("Step");
          var action = TargetResource["::get::Nodeb::step"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Nodeb.users
     * @header lbServices.Nodeb.users
     * @object
     * @description
     *
     * The object `Nodeb.users` groups methods
     * manipulating `User` instances related to `Nodeb`.
     *
     * Call {@link lbServices.Nodeb#users Nodeb.users()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name yoServices.Nodeb#users
         * @methodOf yoServices.Nodeb
         *
         * @description
         *
         * Queries users of Nodeb.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::Nodeb::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.users#count
         * @methodOf yoServices.Nodeb.users
         *
         * @description
         *
         * Counts users of Nodeb.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.users.count = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::count::Nodeb::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.users#create
         * @methodOf yoServices.Nodeb.users
         *
         * @description
         *
         * Creates a new instance in users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.create = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::create::Nodeb::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.users#destroyAll
         * @methodOf yoServices.Nodeb.users
         *
         * @description
         *
         * Deletes all users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.destroyAll = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::delete::Nodeb::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.users#destroyById
         * @methodOf yoServices.Nodeb.users
         *
         * @description
         *
         * Delete a related item by id for users
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.destroyById = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::destroyById::Nodeb::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.users#exists
         * @methodOf yoServices.Nodeb.users
         *
         * @description
         *
         * Check the existence of users relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.exists = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::exists::Nodeb::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.users#findById
         * @methodOf yoServices.Nodeb.users
         *
         * @description
         *
         * Find a related item by id for users
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.findById = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::findById::Nodeb::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.users#link
         * @methodOf yoServices.Nodeb.users
         *
         * @description
         *
         * Add a related item by id for users
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.link = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::link::Nodeb::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.users#unlink
         * @methodOf yoServices.Nodeb.users
         *
         * @description
         *
         * Remove the users relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.unlink = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::unlink::Nodeb::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Nodeb.users#updateById
         * @methodOf yoServices.Nodeb.users
         *
         * @description
         *
         * Update a related item by id for users
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.users.updateById = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::updateById::Nodeb::users"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name yoServices.Comment
 * @header yoServices.Comment
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Comment` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Comment",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Comments/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Comment.nodeb() instead.
        "prototype$__get__nodeb": {
          url: urlBase + "/Comments/:id/nodeb",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#create
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comment` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Comments",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#upsert
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comment` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Comments",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#exists
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Comments/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#findById
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comment` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Comments/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#find
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comment` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Comments",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#findOne
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comment` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Comments/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#updateAll
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Comments/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#deleteById
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Comments/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#count
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Comments/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Comment#prototype$updateAttributes
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comment` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Comments/:id",
          method: "PUT"
        },

        // INTERNAL. Use Comment.nodeb() instead.
        "::get::Comment::nodeb": {
          url: urlBase + "/Comments/:id/nodeb",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name yoServices.Comment#updateOrCreate
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comment` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name yoServices.Comment#update
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name yoServices.Comment#destroyById
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name yoServices.Comment#removeById
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name yoServices.Comment#modelName
    * @propertyOf yoServices.Comment
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Comment`.
    */
    R.modelName = "Comment";


        /**
         * @ngdoc method
         * @name yoServices.Comment#nodeb
         * @methodOf yoServices.Comment
         *
         * @description
         *
         * Fetches belongsTo relation nodeb
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comment` object.)
         * </em>
         */
        R.nodeb = function() {
          var TargetResource = $injector.get("Comment");
          var action = TargetResource["::get::Comment::nodeb"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name yoServices.Step
 * @header yoServices.Step
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Step` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Step",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Steps/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Step.nodebs.findById() instead.
        "prototype$__findById__nodebs": {
          url: urlBase + "/Steps/:id/nodebs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Step.nodebs.destroyById() instead.
        "prototype$__destroyById__nodebs": {
          url: urlBase + "/Steps/:id/nodebs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Step.nodebs.updateById() instead.
        "prototype$__updateById__nodebs": {
          url: urlBase + "/Steps/:id/nodebs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Step.nodebs() instead.
        "prototype$__get__nodebs": {
          isArray: true,
          url: urlBase + "/Steps/:id/nodebs",
          method: "GET"
        },

        // INTERNAL. Use Step.nodebs.create() instead.
        "prototype$__create__nodebs": {
          url: urlBase + "/Steps/:id/nodebs",
          method: "POST"
        },

        // INTERNAL. Use Step.nodebs.destroyAll() instead.
        "prototype$__delete__nodebs": {
          url: urlBase + "/Steps/:id/nodebs",
          method: "DELETE"
        },

        // INTERNAL. Use Step.nodebs.count() instead.
        "prototype$__count__nodebs": {
          url: urlBase + "/Steps/:id/nodebs/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#create
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Steps",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#upsert
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Steps",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#exists
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Steps/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#findById
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Steps/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#find
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Steps",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#findOne
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Steps/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#updateAll
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Steps/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#deleteById
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Steps/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#count
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Steps/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.Step#prototype$updateAttributes
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Steps/:id",
          method: "PUT"
        },

        // INTERNAL. Use Nodeb.step() instead.
        "::get::Nodeb::step": {
          url: urlBase + "/Nodebs/:id/step",
          method: "GET"
        },

        // INTERNAL. Use Step.nodebs.findById() instead.
        "::findById::Step::nodebs": {
          url: urlBase + "/Steps/:id/nodebs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Step.nodebs.destroyById() instead.
        "::destroyById::Step::nodebs": {
          url: urlBase + "/Steps/:id/nodebs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Step.nodebs.updateById() instead.
        "::updateById::Step::nodebs": {
          url: urlBase + "/Steps/:id/nodebs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Step.nodebs() instead.
        "::get::Step::nodebs": {
          isArray: true,
          url: urlBase + "/Steps/:id/nodebs",
          method: "GET"
        },

        // INTERNAL. Use Step.nodebs.create() instead.
        "::create::Step::nodebs": {
          url: urlBase + "/Steps/:id/nodebs",
          method: "POST"
        },

        // INTERNAL. Use Step.nodebs.destroyAll() instead.
        "::delete::Step::nodebs": {
          url: urlBase + "/Steps/:id/nodebs",
          method: "DELETE"
        },

        // INTERNAL. Use Step.nodebs.count() instead.
        "::count::Step::nodebs": {
          url: urlBase + "/Steps/:id/nodebs/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name yoServices.Step#updateOrCreate
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name yoServices.Step#update
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name yoServices.Step#destroyById
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name yoServices.Step#removeById
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name yoServices.Step#modelName
    * @propertyOf yoServices.Step
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Step`.
    */
    R.modelName = "Step";

    /**
     * @ngdoc object
     * @name lbServices.Step.nodebs
     * @header lbServices.Step.nodebs
     * @object
     * @description
     *
     * The object `Step.nodebs` groups methods
     * manipulating `Step` instances related to `Step`.
     *
     * Call {@link lbServices.Step#nodebs Step.nodebs()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name yoServices.Step#nodebs
         * @methodOf yoServices.Step
         *
         * @description
         *
         * Queries nodebs of Step.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        R.nodebs = function() {
          var TargetResource = $injector.get("Step");
          var action = TargetResource["::get::Step::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Step.nodebs#count
         * @methodOf yoServices.Step.nodebs
         *
         * @description
         *
         * Counts nodebs of Step.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.nodebs.count = function() {
          var TargetResource = $injector.get("Step");
          var action = TargetResource["::count::Step::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Step.nodebs#create
         * @methodOf yoServices.Step.nodebs
         *
         * @description
         *
         * Creates a new instance in nodebs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        R.nodebs.create = function() {
          var TargetResource = $injector.get("Step");
          var action = TargetResource["::create::Step::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Step.nodebs#destroyAll
         * @methodOf yoServices.Step.nodebs
         *
         * @description
         *
         * Deletes all nodebs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.nodebs.destroyAll = function() {
          var TargetResource = $injector.get("Step");
          var action = TargetResource["::delete::Step::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Step.nodebs#destroyById
         * @methodOf yoServices.Step.nodebs
         *
         * @description
         *
         * Delete a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.nodebs.destroyById = function() {
          var TargetResource = $injector.get("Step");
          var action = TargetResource["::destroyById::Step::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Step.nodebs#findById
         * @methodOf yoServices.Step.nodebs
         *
         * @description
         *
         * Find a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        R.nodebs.findById = function() {
          var TargetResource = $injector.get("Step");
          var action = TargetResource["::findById::Step::nodebs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.Step.nodebs#updateById
         * @methodOf yoServices.Step.nodebs
         *
         * @description
         *
         * Update a related item by id for nodebs
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for nodebs
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Step` object.)
         * </em>
         */
        R.nodebs.updateById = function() {
          var TargetResource = $injector.get("Step");
          var action = TargetResource["::updateById::Step::nodebs"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name yoServices.TUser
 * @header yoServices.TUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `TUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "TUser",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/tUsers/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use TUser.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/tUsers/:id/user",
          method: "GET"
        },

        // INTERNAL. Use TUser.topic() instead.
        "prototype$__get__topic": {
          url: urlBase + "/tUsers/:id/topic",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#create
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TUser` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/tUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#upsert
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TUser` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/tUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#exists
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/tUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#findById
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TUser` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/tUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#find
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TUser` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/tUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#findOne
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TUser` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/tUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#updateAll
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/tUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#deleteById
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/tUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#count
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/tUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.TUser#prototype$updateAttributes
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TUser` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/tUsers/:id",
          method: "PUT"
        },
      }
    );



        /**
         * @ngdoc method
         * @name yoServices.TUser#updateOrCreate
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TUser` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name yoServices.TUser#update
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name yoServices.TUser#destroyById
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name yoServices.TUser#removeById
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name yoServices.TUser#modelName
    * @propertyOf yoServices.TUser
    * @description
    * The name of the model represented by this $resource,
    * i.e. `TUser`.
    */
    R.modelName = "TUser";


        /**
         * @ngdoc method
         * @name yoServices.TUser#user
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Fetches belongsTo relation user
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::tUser::user"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.TUser#topic
         * @methodOf yoServices.TUser
         *
         * @description
         *
         * Fetches belongsTo relation topic
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Topic` object.)
         * </em>
         */
        R.topic = function() {
          var TargetResource = $injector.get("Topic");
          var action = TargetResource["::get::tUser::topic"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name yoServices.PUser
 * @header yoServices.PUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `PUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "PUser",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/pUsers/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use PUser.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/pUsers/:id/user",
          method: "GET"
        },

        // INTERNAL. Use PUser.nodeb() instead.
        "prototype$__get__nodeb": {
          url: urlBase + "/pUsers/:id/nodeb",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#create
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PUser` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/pUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#upsert
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PUser` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/pUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#exists
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/pUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#findById
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PUser` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/pUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#find
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PUser` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/pUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#findOne
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PUser` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/pUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#updateAll
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/pUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#deleteById
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/pUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#count
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/pUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name yoServices.PUser#prototype$updateAttributes
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PUser` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/pUsers/:id",
          method: "PUT"
        },
      }
    );



        /**
         * @ngdoc method
         * @name yoServices.PUser#updateOrCreate
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PUser` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name yoServices.PUser#update
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name yoServices.PUser#destroyById
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name yoServices.PUser#removeById
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name yoServices.PUser#modelName
    * @propertyOf yoServices.PUser
    * @description
    * The name of the model represented by this $resource,
    * i.e. `PUser`.
    */
    R.modelName = "PUser";


        /**
         * @ngdoc method
         * @name yoServices.PUser#user
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Fetches belongsTo relation user
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::pUser::user"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name yoServices.PUser#nodeb
         * @methodOf yoServices.PUser
         *
         * @description
         *
         * Fetches belongsTo relation nodeb
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Nodeb` object.)
         * </em>
         */
        R.nodeb = function() {
          var TargetResource = $injector.get("Nodeb");
          var action = TargetResource["::get::pUser::nodeb"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name yoServices.LoopBackResourceProvider
   * @header yoServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name yoServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf yoServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name yoServices.LoopBackResourceProvider#setUrlBase
     * @methodOf yoServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
