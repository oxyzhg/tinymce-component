<template>
  <div>
    <textarea :id="Id"></textarea>
  </div>
</template>

<script>
import Tinymce from "tinymce";
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/skins/ui/oxide/content.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/themes/silver/theme.min.js";
import "./langs/zh_CN";
import "./plugins/advlist";
import "./plugins/anchor";
import "./plugins/contextmenu";
import "./plugins/directionality";
import "./plugins/emoticons";
import "./plugins/fullpage";
import "./plugins/fullscreen";
import "./plugins/help";
import "./plugins/hr";
import "./plugins/image";
import "./plugins/imagetools";
import "./plugins/importcss";
import "./plugins/autolink";
import "./plugins/insertdatetime";
import "./plugins/legacyoutput";
import "./plugins/link";
import "./plugins/lists";
import "./plugins/media";
import "./plugins/nonbreaking";
import "./plugins/noneditable";
import "./plugins/pagebreak";
import "./plugins/paste";
import "./plugins/preview";
import "./plugins/autoresize";
import "./plugins/print";
import "./plugins/quickbars";
import "./plugins/save";
import "./plugins/searchreplace";
import "./plugins/spellchecker";
import "./plugins/tabfocus";
import "./plugins/table";
import "./plugins/template";
import "./plugins/textcolor";
import "./plugins/textpattern";
import "./plugins/autosave";
import "./plugins/toc";
import "./plugins/visualblocks";
import "./plugins/visualchars";
import "./plugins/wordcount";
import "./plugins/bbcode";
import "./plugins/charmap";
import "./plugins/code";
import "./plugins/codesample";
import "./plugins/colorpicker";

export default {
  name: "TinymceEditor",
  props: {
    value: {
      default: "",
      type: String
    },
    config: {
      type: Object,
      default: () => {
        return {
          theme: "silver",
          height: 300
        };
      }
    },
    url: {
      default: "",
      type: String
    },
    accept: {
      default: "image/jpeg, image/png",
      type: String
    },
    maxSize: {
      default: 2097152,
      type: Number
    },
    withCredentials: {
      default: false,
      type: Boolean
    }
  },
  data() {
    const Id = Date.now();
    return {
      Id,
      editor: null,
      defaultConfig: {
        // GLOBAL
        language: "zh_CN",
        theme: "silver",
        height: 500,
        menubar: false,
        branding: false,
        toolbar: `undo redo | styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | numlist bullist | outdent indent | image  media table | preview removeformat  hr | paste code  link | fullscreen`,
        plugins: `
          paste
          importcss
          image
          code
          table
          advlist
          fullscreen
          link
          media
          lists
          textcolor
          colorpicker
          hr
          preview
          wordcount
        `,
        // CONFIG
        forced_root_block: "p",
        force_p_newlines: true,
        importcss_append: true,
        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
          *                         { padding:0; margin:0; }
          html, body                { height:100%; }
          img                       { max-width:100%; display:block;height:auto; }
          a                         { text-decoration: none; }
          iframe                    { width: 100%; }
          p                         { line-height:1.6; margin: 0px; }
          table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
          .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
          ul,ol                     { list-style-position:inside; }
        `,
        insert_button_items: "image link | inserttable",
        // CONFIG: Paste
        paste_retain_style_properties: "all",
        paste_word_valid_elements: "*[*]", // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: "all",
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        // CONFIG: Font
        fontsize_formats: "10px 11px 12px 14px 16px 18px 20px 24px",
        // CONFIG: StyleSelect
        style_formats: [
          {
            title: "首行缩进",
            block: "p",
            styles: { "text-indent": "2em" }
          },
          {
            title: "行高",
            items: [
              { title: "1", styles: { "line-height": "1" }, inline: "span" },
              {
                title: "1.5",
                styles: { "line-height": "1.5" },
                inline: "span"
              },
              { title: "2", styles: { "line-height": "2" }, inline: "span" },
              {
                title: "2.5",
                styles: { "line-height": "2.5" },
                inline: "span"
              },
              { title: "3", styles: { "line-height": "3" }, inline: "span" }
            ]
          }
        ],
        // FontSelect
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,
        // Tab
        tabfocus_elements: ":prev,:next",
        object_resizing: true,
        // Image
        imagetools_toolbar:
          "rotateleft rotateright | flipv fliph | editimage imageoptions"
      }
    };
  },
  mounted() {
    // init
    this.initialize();
  },
  beforeDestroy() {
    // destroy
    this.$emit("on-destroy");
    console.log('remove')
    Tinymce.remove(`#${this.Id}`);
  },
  methods: {
    initialize() {
      const self = this;

      this.editor = Tinymce.init({
        // 默认配置
        ...this.defaultConfig,

        // 图片上传
        images_upload_handler: function(blobInfo, success, failure) {
          console.log("blobInfo我被调用了", blobInfo.name(), blobInfo);
          // const imageBase64 = blobInfo.base64();
          const { type, size } = blobInfo.blob();
          console.log(type, size);
          if (size > self.maxSize) {
            failure("文件体积过大");
          }

          if (self.accept.indexOf(type) >= 0) {
            console.log("上传图片");
            uploadPic();
          } else {
            failure("图片格式错误");
          }

          function uploadPic() {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            xhr.withCredentials = self.withCredentials;
            xhr.open("POST", self.url);
            xhr.onload = function() {
              if (xhr.status !== 200) {
                // 抛出 'on-upload-fail' 钩子
                self.$emit("on-upload-fail");
                failure("上传失败: " + xhr.status);
                return;
              }
              // 执行success回调更新图片链接
              success('https://image.liubing.me/2019/12/26/a74de0869dd5e.gif')
              const json = JSON.parse(xhr.responseText);
              // 抛出 'on-upload-complete' 钩子
              self.$emit("on-upload-complete", [json, success, failure]);
            };
            formData.append("file", blobInfo.blob());
            xhr.send(formData);
          }
        },

        // prop内传入的的config
        ...this.config,

        // 挂载的DOM对象
        selector: `#${self.Id}`,
        setup: editor => {
          // 抛出 'on-ready' 事件钩子
          editor.on("init", () => {
            console.log("setup: init");
            self.loading = false;
            self.$emit("on-ready");
            editor.setContent(self.value);
          });

          editor.on("input change undo redo", () => {
            // 是否要加防抖
            self.$emit("input", editor.getContent());
          });
        }
      });
    },
    clear() {
      console.log(this.editor)
      this.editor.then(res => {
        console.log(res)
      })
    }
  }
};
</script>
