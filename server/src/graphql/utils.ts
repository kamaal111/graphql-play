import assert from 'node:assert';

import {Kind, type FieldNode, type GraphQLResolveInfo} from 'graphql';

export function isFieldRequested(info: GraphQLResolveInfo, ...fields: string[]): boolean {
    if (fields.length === 0) return true;

    let currentSelections = info.fieldNodes.find(node => node.name.value === info.fieldName)?.selectionSet?.selections;
    if (!currentSelections) return false;

    for (let i = 0; i < fields.length; i += 1) {
        assert(currentSelections != null);

        const field = fields[i];
        const fieldNode: FieldNode | undefined = currentSelections.find((selection): selection is FieldNode => {
            return selection.kind === Kind.FIELD && selection.name.value === field;
        });
        if (!fieldNode) return false;

        currentSelections = fieldNode.selectionSet?.selections;
        const isLastField = i === fields.length - 1;
        if (!currentSelections && !isLastField) return false;
    }

    return true;
}
