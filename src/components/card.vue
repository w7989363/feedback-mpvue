<template>
  <div class="card-container">
    <div class="left">
      <div class="support">
        <div class="triangle"></div>
        <span class="num">{{problem.support}}</span>
      </div>
    </div>
    <div class="right">
      <div class="title">{{problem.title}}</div>
      <ul class="tags-container">
        <li class="tag" v-for="item in problem.tags" :key="item">{{item}}</li>
      </ul>
      <div class="detail">
        <div class="name">{{problem.name}}</div>
        <div class="time">{{problem.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    problem: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>

<style>
.card-container {
  padding: 10px;
  display: flex;

}
</style>
