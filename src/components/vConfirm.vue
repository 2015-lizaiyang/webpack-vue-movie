<template lang="html">
  <transition name = "bounce">
    <div class="confirm-box" v-show='count'>
      <transition name = "bounces">
        <div class="confirm-dialog" v-show='count'> 
          <div class="confirm-body">
            <slot name="one"></slot>
          </div>
          <div class="confirm-footer" :class="{'confirm-button':count}">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </transition>
        <div></div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      count: {
        type: Boolean,
      }
    }
  }
</script>
<style lang="sass">
.confirm-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.4);
  z-index: 1002;


  @at-root {
    .confirm-dialog {
      width: 80%;
      margin: 0 auto;
      position: absolute;
      top: 40%;
      left: 50%;
      margin: 0 0 0 -40%;
      border-radius: 5px;
      background-color: #fff;
      transition: all 2s ease-in
    }

    .confirm-body {
      padding: 15px 15px 0;

      h3 {
        margin: 0 0 15px 0;
        font-weight: 300;
        color: #222;
        text-align: center;
        text-transform: none;
      }
    }

    .confirm-footer {
      border-top: 1px solid rgba(0,0,0,.2);
      button {
        width: 50%;
        float: left;
        text-align: center;
        line-height: 36px;
        position: relative;
        cursor: pointer;
        background-color: transparent;
        border: none;
        font-family: 'Î¢ÈíÑÅºÚ';
        &:first-child{
          border-right: 1px solid rgba(0,0,0,.2);
        }
      }
    }

    .confirm-button {
      width: 100%;
      
      button {
        width: 100%;
      }
    }
  }
}

.bounce-enter-active {
  animation: bounce-in .7s;
}

.bounce-leave-active {
  animation: bounce-out .7s;
}

.bounces-enter-active {
  animation: bounce-in 1.4s;
}

.bounces-leave-active {
  animation: bounce-out .5s;
}

@keyframes bounce-in {
  0% {
    transform: translateY(-900px);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(-900px);
  }
}


</style>