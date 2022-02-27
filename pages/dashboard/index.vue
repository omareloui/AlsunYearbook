<template>
  <Container tag="main">
    <h1 class="heading">Dashboard</h1>

    <section class="dashboard-cards">
      <DashboardCard to="/dashboard/users" title="users">
        <template #icon>
          <IconUsers />
        </template>
      </DashboardCard>

      <DashboardCard to="/dashboard/actions" title="actions">
        <template #icon>
          <IconActions />
        </template>
      </DashboardCard>
    </section>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
}

section.dashboard-cards {
  @include mt(20px);
  @include flex($gap: 10px, $wrap: true, $center: true);
  @include w(fit-content);
  @include mx(auto);
}
</style>
