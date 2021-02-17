/*
 * Copyright 2020 Spotify AB
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

import { ApiEntity, RELATION_HAS_PART } from '@backstage/catalog-model';
import {
  CodeSnippet,
  InfoCard,
  Link,
  Progress,
  WarningPanel,
} from '@backstage/core';
import {
  EntityTable,
  useEntity,
  useRelatedEntities,
} from '@backstage/plugin-catalog-react';
import React from 'react';
import { apiEntityColumns } from './presets';

type Props = {
  variant?: 'gridItem';
};

export const HasApisCard = ({ variant = 'gridItem' }: Props) => {
  const { entity } = useEntity();
  const { entities, loading, error } = useRelatedEntities(entity, {
    type: RELATION_HAS_PART,
    kind: 'API',
  });

  if (loading) {
    return (
      <InfoCard variant={variant} title="APIs">
        <Progress />
      </InfoCard>
    );
  }

  if (error || !entities) {
    return (
      <InfoCard variant={variant} title="APIs">
        <WarningPanel
          severity="error"
          title="Could not load APIs"
          message={<CodeSnippet text={`${error}`} language="text" />}
        />
      </InfoCard>
    );
  }

  return (
    <EntityTable
      title="APIs"
      variant={variant}
      emptyContent={
        <div>
          No API is part of this system.{' '}
          <Link to="https://backstage.io/docs/features/software-catalog/descriptor-format#kind-api">
            Learn how to add APIs.
          </Link>
        </div>
      }
      columns={apiEntityColumns}
      entities={entities as ApiEntity[]}
    />
  );
};
