<template>
  <div>
    <DarkModeSwitcher />
       <div class="container">
            <div class="block xl:grid grid-cols-2 gap-4">
                <!-- BEGIN: Login Info -->
                <div class="hidden xl:flex flex-col min-h-screen">
                    <a href="" class="-intro-x flex items-center pt-5">
                        <img alt="unreal-capital" class="w-40 h-full" src="dist/images/uc/logo/uc-light.png">
                    </a>
                </div>
                <!-- END: Login Info -->
                <!-- BEGIN: Login Form -->
                <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">  
                    <div class="my-auto mx-auto bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 md:w-2/4">
                        <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left pb-4">
                          Creata a New Account
                        </h2>
                        <form action="#"  class="validate-form">
                            <div class="input-form relative rounded-lg my-5 h-16 appearance-none label-floating">
                                <input class="login__input bg-input h-14 form-control w-full py-2 px-4 text-sm font-sans font-sans leading-normal rounded-lg" id="name" type="text" placeholder="Enter your Name" required>
                                <i data-lucide="user" class="ml-auto -mt-10 pt-1 mr-4 cursor-pointer"></i>
                                <label name="name" class="form-label absolute block text-green-darker font-semibold font-sans w-full px-4 py-2 leading-normal label-float" for="username">
                                   Name
                                </label>
                            </div>
                            <div class="input-form relative rounded-lg my-5 h-16 appearance-none label-floating">
                                <input class="login__input  bg-input h-14 form-control w-full py-2 px-4 text-sm font-sans font-sans leading-normal rounded-lg" id="username" type="email" placeholder="Email" required>
                                <i data-lucide="mail" class="ml-auto -mt-10 pt-1 mr-4 cursor-pointer"></i>
                                <label name="email" class="form-label absolute block text-green-darker font-semibold font-sans w-full px-4 py-2 leading-normal label-float" for="username">
                                    Email
                                </label>
                            </div>
                            <div class="grid grid-cols-12 mt-0 lg:-mt-4 gap-4 lg:gap-x-4">
                                <div class="col-span-12 lg:col-span-6">
                                    <div class="input-form  relative rounded-lg my-5 h-16 appearance-none label-floating">
                                        <input id="showPassword" class="login__input  bg-input h-14 form-control cursor-pointer w-full py-2 px-4 text-sm font-sans font-sans leading-normal rounded-lg"  type="password" placeholder="Password" minlength="6" required>
                                        <i data-lucide="eye" id="toggler" class="eye-show ml-auto -mt-10 pt-1 mr-4 cursor-pointer"></i> 
                                        <label name="password" class="form-label absolute block text-green-darker font-semibold font-sans w-full px-4 py-2 leading-normal label-float" for="password">
                                            Password
                                        </label>
                                    </div>
                                </div>
                                <div class="col-span-12 lg:col-span-6">
                                    <div class="input-form relative rounded-lg my-5 h-16 appearance-none label-floating">
                                        <input class="login__input  bg-input h-14 form-control cursor-pointer w-full py-2 px-4 text-sm font-sans font-sans leading-normal rounded-lg" id="confirmPassword" type="password" placeholder="Confirm Password" minlength="6" required>
                                        <i data-lucide="eye" id="confirmToggler" class="eye-show ml-auto -mt-10 pt-1 mr-4 cursor-pointer"></i> 
                                        <label name="password" class="form-label absolute block text-green-darker font-semibold font-sans w-full px-4 py-2 leading-normal label-float" for="password">
                                            Confirm Password
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left flex flex-col items-center justify-between lg:flex-row gap-4">
                                 <div class="intro-x flex items-center text-slate-600 dark:text-slate-500 mt-4 text-xs sm:text-sm">
                                    <!-- <input id="remember-me" type="checkbox" class="form-check-input border mr-2"> -->
                                    <p class="cursor-pointer select-none">Already a Member?</p>
                                    <a class="text-primary dark:text-slate-200 ml-1" href="login-light.html">Login</a>
                                </div>
                                <div>   
                                    <button type="submit" class="btn btn-primary w-full py-3 px-8 rounded-full xl:mr-3 align-top">Register</button>
                                </div>
                            </div>
                        
                            <!-- END: Validation Form -->
                            <!-- BEGIN: Success Notification Content -->
                            <div id="success-notification-content" class="toastify-content hidden flex" >
                                <i class="text-success" data-lucide="check-circle"></i> 
                                <div class="ml-4 mr-4">
                                    <div class="font-medium">Registration success!</div>
                                    <div class="text-slate-500 mt-1"> Please check your e-mail for further info! </div>
                                </div>
                            </div>
                            <!-- END: Success Notification Content -->
                            <!-- BEGIN: Failed Notification Content -->
                            <div id="failed-notification-content" class="toastify-content hidden flex" >
                                <i class="text-danger" data-lucide="x-circle"></i> 
                                <div class="ml-4 mr-4">
                                    <div class="font-medium">Registration failed!</div>
                                    <div class="text-slate-500 mt-1"> Please check the fileld form. </div>
                                </div>
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
