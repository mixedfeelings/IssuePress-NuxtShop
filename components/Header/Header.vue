<template>
  <header
    class="sticky flex top-0 w-full h-12 px-4 bg-white shadow-md items-center md:h-16 z-10"
  >
    <Hamburger class="md:hidden mr-4" />
    <Logo />
    <Navigation class="md:ml-4" />
    <div class="flex items-center ml-auto">
      <SocialMedia class="px-6 desktop-only" />
      <CartIcon />
    </div>

  </header>
</template>
