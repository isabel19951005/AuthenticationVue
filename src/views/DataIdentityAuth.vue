<template>
  <el-container class="container">
    <el-header>
      <h1>数据身份认证</h1>
    </el-header>
    <el-main>
      <el-form :model="form">
        <el-form-item label="输入数据">
          <el-input v-model="inputData" placeholder="请输入数据"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerDataIdentity">数据身份注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload
              class="upload-demo"
              action=""
              :on-change="handleFileChange"
              :file-list="fileList"
              :auto-upload="false">
            <el-button slot="trigger" type="primary">上传文件</el-button>
          </el-upload>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="verifyDataIdentity">数据身份认证</el-button>
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
      inputData: '',
      dataIdentityOutput: '',
      verifyInput: '',
      verificationMessage: '',
      form: {},
      fileList: [],
      proofFile: null
    };
  },
  methods: {
    async registerDataIdentity() {
      if (this.inputData.trim() === '') {
        this.$message.error('请输入数据');
        return;
      }
      try {
        const response = await axios.get('/static/AliceAdomainfile0.json', { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        setTimeout(()=>{
          a.href = url;
          a.download = 'AliceAdomainfile0.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.$message.success('数据身份注册成功，文件已下载');

        },1000)


      } catch (error) {
        console.error(error);
        this.$message.error('数据身份注册失败');
      }
    },
    handleFileChange(file) {
      this.proofFile = file.raw;
    },
    async verifyDataIdentity() {
      if (!this.proofFile) {
        this.$message.error('请先上传文件');
        return;
      }

      // 简单验证示例：假设所有非空输入都是有效的
      // 在实际应用中，你需要将文件发送到后端进行验证

      setTimeout(()=>{
        this.verificationMessage = '认证成功，该数据来自{DomainA,Alice}';
      },1200)
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
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}

.el-input {
  width: 100%;
}
</style>
