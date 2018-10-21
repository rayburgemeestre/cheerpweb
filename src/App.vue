<template>
    <!--
      <div class="full-width center-content">
        <hello-component name="World" />
      </div>
      -->
    <div class="columns is-fullheight">
      <div class="column">
        <nav class="navbar is-black" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
              <img src="dist/cheerp.png" height="28">
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item">
                Home
              </a>

              <a class="navbar-item">
                Documentation
              </a>

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  More
                </a>

                <div class="navbar-dropdown">
                  <a class="navbar-item">
                    About
                  </a>
                  <a class="navbar-item">
                    Jobs
                  </a>
                  <a class="navbar-item">
                    Contact
                  </a>
                  <hr class="navbar-divider">
                  <a class="navbar-item">
                    Report an issue
                  </a>
                </div>
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-primary">
                    <strong>Compile</strong>
                  </a>
                  <a class="button is-light">
                    Run
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div class="columns is-fullheight">
          <div class="column">
            <div class="rows">
              <div class="row">

                <div class="tabs">
                  <ul>
                    <li class="is-active"><a>Code editor</a></li>
                    <li><a>Compiler</a></li>
                  </ul>
                </div>
                <div id="container_editor_cpp"></div>
                <div class="tags has-addons">
                  <span class="tag">VIM</span>
                  <span class="tag is-primary" id="statusbar_editor_cpp"></span>
                </div>


              </div>
              <div class="row">

                <div class="tabs">
                  <ul>
                    <li class="is-active"><a>HTML</a></li>
                  </ul>
                </div>
                <div id="container_editor_html"></div>
                <div class="tags has-addons">
                  <span class="tag">VIM</span>
                  <span class="tag is-primary" id="statusbar_editor_html"></span>
                </div>

              </div>
            </div>

          </div>
          <div class="column">
            <div class="rows">
              <div class="row">
                <div class="tabs">
                  <ul>
                    <li class="is-active"><a>Javascript</a></li>
                  </ul>
                </div>
                <div id="container_editor_javascript"></div>
                <div class="tags has-addons">
                  <span class="tag">VIM</span>
                  <span class="tag is-primary" id="statusbar_editor_javascript"></span>
                </div>
              </div>
              <div class="row">
                <div class="tabs">
                  <ul>
                    <li class="is-active"><a>Compiler output</a></li>
                    <li><a>Run output</a></li>
                  </ul>
                </div>
                <textarea class="textarea" placeholder="Compiler output will be displayed here."></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- for development commented out <script src="main.js"></script> -->
      </div>
    </div>
</template>

<script>
import HelloComponent from './components/HelloComponent.vue'
export default {
  components: {
    HelloComponent
  }
}
</script>

<style scoped>
.full-width {
    width: 100%;
}
.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
