<template>
  <div>
    <DarkModeSwitcher />
    <div class="container">
            <div class="block xl:grid grid-cols-2 gap-4">
                <!-- BEGIN: Login Info -->
                <div class="hidden xl:flex flex-col min-h-screen">
                    <a href="" class="-intro-x flex items-center pt-5">
                        <img alt="unreal-capital"  style="margin-left: 4rem;" class="w-64 h-full" src="src/assets/images/uc/uc-light.png">
                    </a>
                    <div class="my-auto">
                      <img alt="unreal-captital" class="-intro-x opacity-5 m-auto ml-20 lg:w-3/5 xl:w-4/5 xl:-ml-24 xl:-mt-12 globe__spin" src="src/assets/images/uc/globe-removebg-preview.png">
                    </div>
                </div>
                <!-- END: Login Info -->
                <!-- BEGIN: Login Form -->
                <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                    <div class="my-auto mx-auto bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 md:w-2/4 xl:w-8/12 2xl:w-9/12">
                        <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                            Reset password
                        </h2>
                        <div class="intro-x mt-2 text-slate-400">Create a new password for your account.</div>
                        
                         <form action="#"  class="validate-form pt-4">
                          
                              <div class="input-form  relative rounded-lg my-5 h-16 appearance-none label-floating">
                                <input id="showPassword" class="login__input bg-input h-14 form-control cursor-pointer w-full py-2 px-4 text-sm 2xl:text-xl font-sans font-sans leading-normal rounded-lg" type="password" placeholder="Password" minlength="6" required>
                                <i data-lucide="eye" id="toggler" class="eye-show ml-auto -mt-10 pt-1 mr-4 cursor-pointer"></i> 
                                <label name="password" class="form-label absolute block text-green-darker font-semibold font-sans w-full px-4 py-2 leading-normal label-float" for="password">
                                    Password
                                </label>
                              </div>
                              <div class="input-form  relative rounded-lg my-5 h-16 appearance-none label-floating">
                                <input id="showPassword" class="login__input bg-input h-14 form-control cursor-pointer w-full py-2 px-4 text-sm 2xl:text-xl font-sans font-sans leading-normal rounded-lg" type="password" placeholder="Confirm Password" minlength="6" required>
                                <i data-lucide="eye" id="toggler" class="eye-show ml-auto -mt-10 pt-1 mr-4 cursor-pointer"></i> 
                                <label name="confirm-password" class="form-label absolute block text-green-darker font-semibold font-sans w-full px-4 py-2 leading-normal label-float" for="confirm-password">
                                    Confirm Password
                                </label>
                              </div>
                            
                              <div class="intro-x mt-5 xl:mt-8">
                                <button type="submit" class="btn btn-primary py-3 px-4 w-40 text-sm 2xl:text-base float-right rounded-full align-top">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- END: Login Form -->
            </div>
        </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import dom from "@left4code/tw-starter/dist/js/dom";

onMounted(() => {
  dom("body").removeClass("main").removeClass("error-page").addClass("login");
});
</script>
