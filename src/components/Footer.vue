<template>
    <footer class="footer">
      <div class="footer-content">
        <p>© {{ currentYear }} Auricle Jewellery. All Rights Reserved.</p>
      </div>
    </footer>
  </template>
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(), // ✅ Auto updates the year
      };
    },
  };
  </script>  