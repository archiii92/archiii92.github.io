/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","824d6b871a858135700b7735e73193b3"],["/bower_components/app-layout/app-drawer/app-drawer.html","c56ae1297324c962360ebe45b19f45b0"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","971d4deb6ba3b40262fb13100c236a25"],["/bower_components/app-layout/app-header/app-header.html","320079d531ef602329dff321e4833734"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","78b0ae3dace93c047903cd1885d35150"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","f9af3b19ba0df5aea027b835f0d4e766"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","0d375fa44800f0d196034e6a6240a5c3"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","f3f0a1ef72443548681e08410ef8cac2"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","45ac7838ae5551c41616a25f7a1f1ae6"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","db1405dd5694b43cfce35d2522ab9825"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","48795db4cf5b8a18cc66a976e1337a87"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","13bd1ea458aa7e2eae6b9906f5a17e5c"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","a50af0d3b7b87d87f13aeb8abf049815"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","fc264386961547372bf200ad129c8852"],["/bower_components/app-layout/helpers/helpers.html","0a1031655fe51a08071ff044e603214b"],["/bower_components/app-route/app-location.html","74de228313a07e2e657eb98c16788caa"],["/bower_components/app-route/app-route-converter-behavior.html","c5d76631af30c2de417baec672168673"],["/bower_components/app-route/app-route.html","2c012f3848f98d3164228ad9c2742b5a"],["/bower_components/font-roboto/roboto.html","8b9218ffd40ebb430e7f55674cf55ffd"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","032ddccbe04fadf233db599b63b171b9"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","db18aab5d2e81d8e9d9268e6ecf72bfa"],["/bower_components/iron-behaviors/iron-button-state.html","9fb410eb4dd2cf074011b4d7565fe520"],["/bower_components/iron-behaviors/iron-control-state.html","31c7774a1ca49ee9d50d8986c257b329"],["/bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","4941bb1f98c18a580867935163391b6c"],["/bower_components/iron-dropdown/iron-dropdown.html","69de7cbbb5154bc46a1faf232c0826e2"],["/bower_components/iron-fit-behavior/iron-fit-behavior.html","35bb347fbeed620a921bdb93c40363f4"],["/bower_components/iron-flex-layout/iron-flex-layout.html","d2c815e6a919f6da94ce3649e6e9aa87"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","79266ae6cc24b57c344710155176ff8f"],["/bower_components/iron-icon/iron-icon.html","800370dcfb6957282b10c6b32c1e2e47"],["/bower_components/iron-icons/iron-icons.html","b06b48bbd24e44ce5f592c008e254376"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","a48dab906bc6c0f357bf5b1a6b6fb52d"],["/bower_components/iron-input/iron-input.html","c534697639484286f9cd62bf3bb6929d"],["/bower_components/iron-location/iron-location.html","1d5efb93f4e9786005319eb8e1ec648c"],["/bower_components/iron-location/iron-query-params.html","8f3f8cf693637171b6280d8a141b9a69"],["/bower_components/iron-media-query/iron-media-query.html","b17f5807fd96603b8832cd2ee931cc40"],["/bower_components/iron-menu-behavior/iron-menu-behavior.html","9bbf9e8f6d6baef6264dce1a02993526"],["/bower_components/iron-meta/iron-meta.html","b07992bdde833d48eb5893bc6c0b40bc"],["/bower_components/iron-overlay-behavior/iron-focusables-helper.html","b935952337df172121dae50aa75d0ff6"],["/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","a70e5917cb2f5bb64e53e44b2f0cd764"],["/bower_components/iron-overlay-behavior/iron-overlay-behavior.html","7227fe9e747518edb9676d3d5bce48ff"],["/bower_components/iron-overlay-behavior/iron-overlay-manager.html","dfcf04b2b9b17dceb9176c5d4a1233b8"],["/bower_components/iron-pages/iron-pages.html","1e409876eb152c1c3e0c6efb29358e71"],["/bower_components/iron-range-behavior/iron-range-behavior.html","5f20f9664f966e5707b1aa9ac8299518"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","cadf39c81d35ff214b8356e1033fd7a0"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","2f3022f33f535f03fa652b016b18aa8d"],["/bower_components/iron-selector/iron-multi-selectable.html","ef1891f34c77b21c01c480ab28c743de"],["/bower_components/iron-selector/iron-selectable.html","45b4259e868c47f85f2ced7d3337fd03"],["/bower_components/iron-selector/iron-selection.html","d38a136db111dc594d0e9b27c283a47a"],["/bower_components/iron-selector/iron-selector.html","fd5fa9e6f3bf894b065f43d2711bba45"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","1129bf5593ece9189962e470025ab759"],["/bower_components/neon-animation/animations/fade-in-animation.html","32e6403f666f0a23bf0a12d9d13ac7e0"],["/bower_components/neon-animation/animations/fade-out-animation.html","0b7783df10a3455dd3079d5dabfc1882"],["/bower_components/neon-animation/animations/scale-up-animation.html","de076496a5be793364972055c53a930f"],["/bower_components/neon-animation/neon-animatable-behavior.html","a0e4868750147e67dcd56b5ac5535eab"],["/bower_components/neon-animation/neon-animation-behavior.html","7bea601b65a14b9d7389d806db6cbfec"],["/bower_components/neon-animation/neon-animation-runner-behavior.html","0d0e9eeccf315df7c0c6330049c2cd45"],["/bower_components/neon-animation/web-animations.html","b9b5d0a4f7234c3c7c21b5078cdf77d5"],["/bower_components/paper-behaviors/paper-button-behavior.html","1e6e9794c87cb389d4191911ec554890"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","ea41e4250bc3ea30e659071b61e0df33"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","ed51cc379e55570173529cd58ca00b59"],["/bower_components/paper-button/paper-button.html","a2db7b5c134887e57b85092f80a222be"],["/bower_components/paper-dialog-behavior/paper-dialog-behavior.html","02e7573d9959b3e056bac85c632cc939"],["/bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","53a7280f7f749585af412cd0fdd02e72"],["/bower_components/paper-dialog/paper-dialog.html","be9adca3e4e1f0b7f9c4cb7b33854a3b"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","4c48b1e338ed304011fb2070a299b12d"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","5937bb21d75c1f6a3b6a3b71cb310580"],["/bower_components/paper-dropdown-menu/paper-dropdown-menu.html","076470166920533b45921878d4d40025"],["/bower_components/paper-icon-button/paper-icon-button.html","eea29b3adb8c4b4cd68369ceb1614ff1"],["/bower_components/paper-input/paper-input-addon-behavior.html","9f7c79f09b3e662a7a0a0ec2210c5331"],["/bower_components/paper-input/paper-input-behavior.html","cd3410b154561988640bf6c0153b1346"],["/bower_components/paper-input/paper-input-char-counter.html","3afc53a558e36ccdbb0718b8da52b33a"],["/bower_components/paper-input/paper-input-container.html","d90f28b41fbe59cfaae6433e4998716d"],["/bower_components/paper-input/paper-input-error.html","270d241c108123335bf6dbe30d9e768f"],["/bower_components/paper-input/paper-input.html","97d3e67cd7e5997b4c8e08766d598bad"],["/bower_components/paper-item/paper-item-behavior.html","e8eebea30adc0d64efc784080d6ab6f7"],["/bower_components/paper-item/paper-item-shared-styles.html","a0b1e1b7020a5f28df19f661a998665a"],["/bower_components/paper-item/paper-item.html","b0613096efa66d97a309df05c873bc66"],["/bower_components/paper-listbox/paper-listbox.html","6fc75e3aca5cc2ae63a88f9f5f4689d0"],["/bower_components/paper-material/paper-material-shared-styles.html","53507362c2b3d2ad2879475ba0578f83"],["/bower_components/paper-menu-button/paper-menu-button-animations.html","494ce3a3d3cd95ed5dd66feff0235150"],["/bower_components/paper-menu-button/paper-menu-button.html","b7d8a4ae6d0d18bb81214a9c7742b87c"],["/bower_components/paper-progress/paper-progress.html","57a4e32d3e83ef3fb095dd3c16202b0b"],["/bower_components/paper-ripple/paper-ripple.html","9be0bea4c0ee964df2b113790575dd3b"],["/bower_components/paper-styles/color.html","676564d6f830197d333a4f4c2f6ebaca"],["/bower_components/paper-styles/default-theme.html","f34560e7b2fde3ec06e135a47a83056f"],["/bower_components/paper-styles/shadow.html","a42c9ee6919674abb5de48fe4364295a"],["/bower_components/paper-styles/typography.html","4ffc8e5a0a957686d7bf4a9c3110ba18"],["/bower_components/polymer/polymer-micro.html","e468c439567926cbb06f2f1adc600822"],["/bower_components/polymer/polymer-mini.html","b22f4c983047b07bf3a0b844b1f55250"],["/bower_components/polymer/polymer.html","4ce72be3c73de991c14562634d99f5a3"],["/bower_components/star-rating/star-rating.html","21208acc0d956d1e035ff997dbf52c13"],["/bower_components/vaadin-grid/iron-list-behavior.html","c350756e4d1f910a01b613f6344bd18c"],["/bower_components/vaadin-grid/vaadin-grid-active-item-behavior.html","3545d8bc9bc02cd1ba4f8a43604e6166"],["/bower_components/vaadin-grid/vaadin-grid-array-data-provider-behavior.html","e3bd5eb1a96e286c7f2a154cdfd6bfa8"],["/bower_components/vaadin-grid/vaadin-grid-cell-click-behavior.html","f075d1b7d32d5765454abda70eaa84cc"],["/bower_components/vaadin-grid/vaadin-grid-column-reordering-behavior.html","d3828637cd5439697d43bffb5f4326b0"],["/bower_components/vaadin-grid/vaadin-grid-column.html","73ddf96751593c70a3af5d63d286aa2d"],["/bower_components/vaadin-grid/vaadin-grid-data-provider-behavior.html","8af4950221e384442b10ea73bf97508c"],["/bower_components/vaadin-grid/vaadin-grid-dynamic-columns-behavior.html","ec3e4300d0d43ea8fe687488ab3b8c7c"],["/bower_components/vaadin-grid/vaadin-grid-filter-behavior.html","d5c2b35cf17a271e7866396520f9834e"],["/bower_components/vaadin-grid/vaadin-grid-filter.html","49a55b773cf2c5ca547084bee36eda13"],["/bower_components/vaadin-grid/vaadin-grid-focusable-cell-container-behavior.html","59761a586bcacbb8801a416d388ebb08"],["/bower_components/vaadin-grid/vaadin-grid-keyboard-navigation-behavior.html","46582c9e73911a511c4513a68e56eab2"],["/bower_components/vaadin-grid/vaadin-grid-row-details-behavior.html","271ee01044e79e9a7482264d58357c6c"],["/bower_components/vaadin-grid/vaadin-grid-selection-behavior.html","2b29ffce3fbb8242f5647b97009f8f58"],["/bower_components/vaadin-grid/vaadin-grid-sizer.html","3c5cb0dbe9fac2487f4b3d92e8e39547"],["/bower_components/vaadin-grid/vaadin-grid-sort-behavior.html","e2af79b316c91a9ed403d3df0ecc46de"],["/bower_components/vaadin-grid/vaadin-grid-sorter.html","8d3f9b3f4f460b109f78e0cb9e7b42bc"],["/bower_components/vaadin-grid/vaadin-grid-table-cell.html","e22708f87b24025eeb03ae86dbddd901"],["/bower_components/vaadin-grid/vaadin-grid-table-focus-trap.html","6c3fc8b664566ff81ac608d15f084e9b"],["/bower_components/vaadin-grid/vaadin-grid-table-header-footer.html","0ec813b299d085f4fcf4c8bd298f898f"],["/bower_components/vaadin-grid/vaadin-grid-table-outer-scroller.html","630b014e16e6aa2c7122ee9cac45a00e"],["/bower_components/vaadin-grid/vaadin-grid-table-row.html","7f7b2d898f03cb00820f79d36f2e1cc8"],["/bower_components/vaadin-grid/vaadin-grid-table-scroll-behavior.html","8ca7dc403304dace5aa53c52e38b347b"],["/bower_components/vaadin-grid/vaadin-grid-table.html","43da4c29035ae0b806ba214080ad8189"],["/bower_components/vaadin-grid/vaadin-grid-templatizer.html","71d8607a9f37b4ab9bc5f1d69413691d"],["/bower_components/vaadin-grid/vaadin-grid.html","4e2b1fe441a511655d1bce81be10e81d"],["/bower_components/vaadin-upload/vaadin-upload-file.html","874b3d7243a78ba35521aeacaee33174"],["/bower_components/vaadin-upload/vaadin-upload-icons.html","9159246aee7c85499e6bd4f15722a1e9"],["/bower_components/vaadin-upload/vaadin-upload.html","3b9fb9163bd7708ce4c5e69618242df8"],["/bower_components/web-animations-js/web-animations-next-lite.min.js","15d16a62a8a0e8475a0daa1e025b6510"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/images/favicon.gif","5f134e86d0092e5351595c65fd9999be"],["/index.html","cf685a29546b9b9bf859cf4611589905"],["/src/coobook-app.html","294ddec63714731e42e4df924a96fa48"],["/src/icons.html","f98e6faef7c878b078c6a66d09bf432c"],["/src/ingredients-list-view.html","47ac5ecd8042aa08554bd84ea12efa7c"],["/src/recipe-create-view.html","1ef4d0bf92d5d1aee44b7a648c80f02c"],["/src/recipes-list-view.html","e6c4238e9b1173217036dccf97bcf6ab"],["/src/shared-styles.html","3b621ff42b6b8d68b18ced55a68b616c"],["/src/view404.html","9631ba386fcb84629dce581df410fa36"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







