import { BasePage } from './base';

/**
 * @deprecated Use functional composables from @composables instead.
 * If a composable doesn't exist for your use case, please create a new one in:
 * cypress/composables
 *
 * This class-based approach is being phased out in favor of more modular functional composables.
 * Each getter and action in this class should be moved to individual composable functions.
 */
export class WorkflowsPage extends BasePage {
	url = '/home/workflows';

	getters = {
		newWorkflowButtonCard: () => cy.getByTestId('new-workflow-card'),
		newWorkflowTemplateCard: () => cy.getByTestId('new-workflow-template-card'),
		searchBar: () => cy.getByTestId('resources-list-search'),
		createWorkflowButton: () => {
			cy.getByTestId('add-resource-workflow').should('be.visible');
			return cy.getByTestId('add-resource-workflow');
		},
		workflowCards: () => cy.getByTestId('resources-list-item'),
		workflowCard: (workflowName: string) =>
			this.getters
				.workflowCards()
				.contains(workflowName)
				.parents('[data-test-id="resources-list-item"]'),
		workflowTags: (workflowName: string) =>
			this.getters.workflowCard(workflowName).findChildByTestId('workflow-card-tags'),
		workflowCardContent: (workflowName: string) =>
			this.getters.workflowCard(workflowName).findChildByTestId('card-content'),
		workflowActivator: (workflowName: string) =>
			this.getters.workflowCard(workflowName).findChildByTestId('workflow-card-activator'),
		workflowActivatorStatus: (workflowName: string) =>
			this.getters.workflowActivator(workflowName).findChildByTestId('workflow-activator-status'),
		workflowCardActions: (workflowName: string) =>
			this.getters.workflowCard(workflowName).findChildByTestId('workflow-card-actions'),
		workflowDeleteButton: () =>
			cy.getByTestId('action-toggle-dropdown').filter(':visible').contains('Delete'),
		workflowMoveButton: () =>
			cy.getByTestId('action-toggle-dropdown').filter(':visible').contains('Move'),
		workflowFilterButton: () => cy.getByTestId('resources-list-filters-trigger').filter(':visible'),
		workflowTagsDropdown: () => cy.getByTestId('tags-dropdown'),
		workflowTagItem: (tag: string) => cy.getByTestId('tag').contains(tag),
		workflowStatusDropdown: () => cy.getByTestId('status-dropdown'),
		workflowStatusItem: (status: string) => cy.getByTestId('status').contains(status),
		workflowOwnershipDropdown: () => cy.getByTestId('user-select-trigger'),
		workflowOwner: (email: string) => cy.getByTestId('user-email').contains(email),
		workflowResetFilters: () => cy.getByTestId('workflows-filter-reset'),
		// Not yet implemented
		// myWorkflows: () => cy.getByTestId('my-workflows'),
		// allWorkflows: () => cy.getByTestId('all-workflows'),
	};

	actions = {
		createWorkflowFromCard: () => {
			this.getters.newWorkflowButtonCard().click();
		},
		deleteWorkFlow: (name: string) => {
			cy.visit(this.url);
			this.getters.workflowCardActions(name).click();
			this.getters.workflowDeleteButton().click();
			cy.intercept('DELETE', '/rest/workflows/*').as('deleteWorkflow');

			cy.get('button').contains('delete').click();
			cy.wait('@deleteWorkflow');
		},
	};
}
