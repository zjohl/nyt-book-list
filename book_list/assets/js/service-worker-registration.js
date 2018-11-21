/**
 * Copyright 2015 Google Inc. All rights reserved.
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
 *
 */

/**
 * Taken from the dmeo sw app created by GoogleChromeLabs
 * https://github.com/GoogleChromeLabs/sw-precache
 */

/* eslint-env browser */
'use strict';

export default function registerServiceWorker() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
};