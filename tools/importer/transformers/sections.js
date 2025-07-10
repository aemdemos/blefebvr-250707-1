/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */

import { TransformHook } from './transform.js';

let currentSection = null;

function buildSectionMetadataTable(section, document) {
  const smCells = [
    ['section metadata'],
    ['style', section],
  ];
  return WebImporter.DOMUtils.createTable(smCells, document);
}

export default function transform(hookName, element, payload) {
  // handle section information from the inventory
  if (hookName === TransformHook.beforeParse) {
    if (payload.section) {
      if (currentSection !== payload.section) {
        if (currentSection) {
          element.before(buildSectionMetadataTable(currentSection, payload.document));
        }
        element.before(payload.document.createElement('hr'));
      }
      currentSection = payload.section;
    } else {
      if (currentSection) {
        element.before(buildSectionMetadataTable(currentSection, payload.document));
        element.before(payload.document.createElement('hr'));
      }
      currentSection = null;
    }
  }
}
