import Component from '@ember/component';
import TableCommon from '../../mixins/table-common';
import { computed } from '@ember/object';

export default Component.extend(TableCommon, {
  columns: computed(function() {
    return [{
      label: 'First Name',
      valuePath: 'planName',
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'description',
      width: '150px'
    }, {
      label: 'Address',
      valuePath: 'physioID'
    }, {
      label: 'Actions',
      width: '100px',
      sortable: false,
      cellComponent: 'user-actions'
    }];
  }),

  actions: {
    deleteUser(row) {
      let confirmed = window.confirm(`Are you sure you want to delete ${row.get('firstName')} ${row.get('lastName')}?`);

      if (confirmed) {
        this.get('table').removeRow(row);
        row.get('content').deleteRecord();
      }
    },

    notifyUser(row) {
      window.alert(`${row.get('firstName')} ${row.get('lastName')} has been notified.`);
    }
  }
});
