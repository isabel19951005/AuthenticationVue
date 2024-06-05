<template>
  <el-container class="container">
    <el-header>
      <h1>用户身份注册</h1>
    </el-header>
    <el-main>
      <el-form :model="form">
        <el-form-item>
          <el-button type="primary" @click="registerGID">全局域身份注册</el-button>
          <el-input v-model="gidOutput" placeholder="gid:xxxx" readonly></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="generateProof">生成proof</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload
              class="upload-demo"
              action=""
              :on-change="handleFileChange"
              :file-list="fileList"
              :auto-upload="false">
            <el-button slot="trigger" type="primary">上传 proof 文件</el-button>
          </el-upload>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="verifyProof">验证proof</el-button>
          <el-alert
              v-if="verificationMessage"
              :title="verificationMessage"
              type="success"
              show-icon>
          </el-alert>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      gidOutput: '',
      proofOutput: '',
      inputProof: '',
      verificationMessage: '',
      form: {},
      fileList: [],
      proofFile: null
    };
  },
  methods: {
    generateRandomHex(size) {
      let result = '';
      const characters = '0123456789abcdef';
      const charactersLength = characters.length;
      for (let i = 0; i < size; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    registerGID() {
      setTimeout(() => {
        //代码
        this.gidOutput = `gid:${this.generateRandomHex(128)}`;
        this.$message.success('全局身份注册成功');
      }, 500);

    },
    async generateProof() {
      try {
        const response = await axios.get('/static/AdminB.json', { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // 设置延时
        setTimeout(()=>{
          a.download = 'AdminB.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },800);

      } catch (error) {
        console.error(error);
        this.$message.error('生成proof失败');
      }
    },
    handleFileChange(file) {
      this.proofFile = file.raw;
    },
    async verifyProof() {
      if (!this.proofFile) {
        this.$message.error('请先上传 proof 文件');
        return;
      }

      const formData = new FormData();
      formData.append('proofFile', this.proofFile);

      try {
        // const response = await axios.post('YOUR_BACKEND_API_FOR_VERIFY', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // });
        setTimeout(()=>{
          this.verificationMessage = '验证成功,合法用户';
        },1500)

        // if (response.data.valid) {
        //   this.verificationMessage = '验证成功';
        // } else {
        //   this.verificationMessage = '验证失败';
        // }
      } catch (error) {
        console.error(error);
        this.$message.error('验证失败');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
}

.el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}

.el-input {
  flex: 1;
}
</style>
