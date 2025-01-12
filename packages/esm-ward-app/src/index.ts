import {
  defineConfigSchema,
  defineExtensionConfigSchema,
  getAsyncLifecycle,
  getSyncLifecycle,
  registerBreadcrumbs,
  registerFeatureFlag,
} from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { admissionRequestNoteRowConfigSchema } from './config-schema-admission-request-note';
import { coloredObsTagsCardRowConfigSchema } from './config-schema-extension-colored-obs-tags';
import { moduleName } from './constant';
import { createDashboardLink } from './createDashboardLink.component';
import rootComponent from './root.component';
import { motherChildRowConfigSchema } from './config-schema-mother-child-row';
import { pendingItemsExtensionConfigSchema } from './config-schema-pending-items-extension';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');


const options = {
  featureName: 'ward',
  moduleName,
};

export const root = getSyncLifecycle(rootComponent, options);

export const wardDashboardLink = getSyncLifecycle(createDashboardLink({ name: 'ward', title: 'wards' }), options);

// t('admissionRequests', 'Admission Requests')
export const admissionRequestWorkspace = getAsyncLifecycle(
  () => import('./ward-workspace/admission-request-workspace/admission-requests.workspace'),
  options,
);

export const admitPatientFormWorkspace = getAsyncLifecycle(
  () => import('./ward-workspace/admit-patient-form-workspace/admit-patient-form.workspace'),
  options,
);

// Title for this workspace is set dynamically
export const wardPatientWorkspace = getAsyncLifecycle(
  () => import('./ward-workspace/patient-details/ward-patient.workspace'),
  options,
);

// t("inpatientNotesWorkspaceTitle", "In-patient notes")
export const wardPatientNotesWorkspace = getAsyncLifecycle(
  () => import('./ward-workspace/ward-patient-notes/notes.workspace'),
  options,
);

export const wardPatientActionButtonExtension = getAsyncLifecycle(
  () => import('./ward-workspace/patient-details/ward-patient-action-button.extension'),
  options,
);

export const wardPatientNotesActionButtonExtension = getAsyncLifecycle(
  () => import('./ward-workspace/ward-patient-notes/notes-action-button.extension'),
  options,
);

export const coloredObsTagCardRowExtension = getAsyncLifecycle(
  () => import('./ward-patient-card/card-rows/colored-obs-tags-card-row.extension'),
  options,
);

export const admissionRequestNoteRowExtension = getAsyncLifecycle(
  () => import('./ward-patient-card/card-rows/admission-request-note.extension'),
  options,
);

export const motherChildRowExtension = getAsyncLifecycle(
  () => import('./ward-patient-card/card-rows/mother-child-row.extension'),
  options,
);

export const pendingItemsCardRowExtension = getAsyncLifecycle(
  () => import('./ward-patient-card/card-rows/pending-items-car-row.extension'),
  options,
);

// t('transfers', 'Transfers')
export const patientTransferAndSwapWorkspace = getAsyncLifecycle(
  () => import('./ward-workspace/patient-transfer-bed-swap/patient-transfer-swap.workspace'),
  options,
);

// t('discharge', 'Discharge')
export const patientDischargeWorkspace = getAsyncLifecycle(
  () => import('./ward-workspace/patient-discharge/patient-discharge.workspace'),
  options,
);

export const patientTransferAndSwapWorkspaceSiderailIcon = getAsyncLifecycle(
  () => import('./action-menu-buttons/transfer-workspace-siderail.component'),
  options,
);

// t('transferRequest', 'Transfer request')
export const patientTransferRequestWorkspace = getAsyncLifecycle(
  () => import('./ward-workspace/patient-transfer-request-workspace/patient-transfer-request.workspace'),
  options,
);

export const patientDischargeWorkspaceSideRailIcon = getAsyncLifecycle(
  () => import('./action-menu-buttons/discharge-workspace-siderail.component'),
  options,
);

export const patientClinicalFormsWorkspace = getAsyncLifecycle(
  () => import('./ward-workspace/patient-clinical-forms-workspace/patient-clinical-forms.workspace'),
  options,
);

export const clinicalFormWorkspaceSideRailIcon = getAsyncLifecycle(
  () => import('./action-menu-buttons/clinical-forms-workspace-siderail.component'),
  options,
);

export function startupApp() {
  registerBreadcrumbs([]);
  defineConfigSchema(moduleName, configSchema);
  defineExtensionConfigSchema('colored-obs-tags-card-row', coloredObsTagsCardRowConfigSchema);
  defineExtensionConfigSchema('admission-request-note-card-row', admissionRequestNoteRowConfigSchema);
  defineExtensionConfigSchema('mother-child-card-row', motherChildRowConfigSchema);
  defineExtensionConfigSchema('ward-patient-pending-items-card-row', pendingItemsExtensionConfigSchema);

  registerFeatureFlag(
    'bedmanagement-module',
    'Bed management module',
    'Enables features related to bed management / assignment. Requires the backend bed management module to be installed.',
  );

  registerFeatureFlag(
    'ward-view-vertical-tiling',
    'Ward view vertical tiling',
    'Enable tiling of bed cards vertically in the ward view.',
  );
}
