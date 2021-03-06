// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {ServiceListController} from './servicelist_controller';
import {actionbarViewName} from 'chrome/chrome_state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/breadcrumbs_component';
import {stateName, stateUrl} from './servicelist_state';

/**
 * Configures states for the service list view.
 *
 * @param {!ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
export default function stateConfig($stateProvider) {
  $stateProvider.state(stateName, {
    url: stateUrl,
    resolve: {
      'serviceListResource': getServiceListResource,
      'serviceList': resolveServiceList,
    },
    data: {
      [breadcrumbsConfig]: {
        'label': 'Services',
      },
    },
    views: {
      '': {
        controller: ServiceListController,
        controllerAs: 'ctrl',
        templateUrl: 'servicelist/servicelist.html',
      },
      [actionbarViewName]: {},
    },
  });
}

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource<!backendApi.ServiceList>}
 */
export function getServiceListResource($resource) {
  return $resource('api/v1/services');
}

/**
 * @param {!angular.Resource<!backendApi.ServiceList>} serviceListResource
 * @return {!angular.$q.Promise}
 */
export function resolveServiceList(serviceListResource) {
  return serviceListResource.get().$promise;
}
