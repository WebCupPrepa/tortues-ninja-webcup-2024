<script setup>
import HeroHeader from "@/components/guest/home/HeroHeader.vue";
import SectionFeedback from "@/components/guest/home/SectionFeedback.vue";
import FeatureSection from "@/components/guest/home/FeatureSection.vue";
import FaqSection from "@/components/guest/home/FaqSection.vue";
import SectionContact from "@/components/guest/home/SectionContact.vue";
import SectionFooter from "@/components/guest/home/SectionFooter.vue";
</script>

<template>
  <div>
    <HeroHeader />
    <FeatureSection />
    <SectionFeedback />
    <FaqSection />
    <SectionContact />
    <SectionFooter />
  </div>
</template>
<style lang="scss" scoped></style>
