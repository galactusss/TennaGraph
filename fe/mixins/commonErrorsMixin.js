const commonErrorsMixin = {
  data: () => ({
    commonErrors: [],
    formErrors: {
    }
  }),
  created: function () {
  },
  methods: {
    setResponseErrors(resp, keys) {
      if (!resp) { return }
      else if (!resp.response && !this.isOnline) {
        this.$store.dispatch("ntf/displayNotifications", [this.$i18n.t('common_errors_mixin.offline_mode')]);
        return
      } else if (!resp.response) { return }
      this.formErrors = {};
      let errors = resp.response.data.errors;

      if (errors.hasOwnProperty('common')) {
        this.commonErrors = errors.common;
        this.$store.dispatch("ntf/displayNotifications", this.commonErrors)
      } else if (resp.message) {
        this.commonErrors = resp["Error: " + resp.message];
      }

      if (!keys) { return }
      keys.forEach(key => {
        if (errors.hasOwnProperty(key)) {
          this.formErrors[key] = errors[key];
        }
      })
    },
    setPreRequestErrors(errors, keys) {
      if (!errors) { return }

      if (errors.hasOwnProperty('common')) {
        this.commonErrors = errors.common;
        this.$store.dispatch("ntf/displayNotifications", this.commonErrors)
      }

      if (!keys) { return }
      keys.forEach(key => {
        if(errors.hasOwnProperty(key)) {
          this.formErrors[key] = errors[key];
        }
      })
    },
    cleanErrors() {
      this.formErrors = {};
      this.commonErrors = [];
    },
  },
  computed: {
    isOnline() {
      return this.$store.getters['app/isOnline']
    }
  }
};

export default commonErrorsMixin
