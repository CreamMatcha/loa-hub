import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, minlength: 2 },
    passwordHash: { type: String, required: true },
    // 로그인 사용자의 서버 저장 데이터 (기기 간 동기화)
    data: {
      roster: { type: Array, default: [] },
      favorites: { type: Array, default: [] },
      presets: { type: Array, default: [] },
      representativeChar: { type: String, default: null },
    },
  },
  { timestamps: true }
);

// 비밀번호 설정 헬퍼
userSchema.methods.setPassword = async function (plain) {
  this.passwordHash = await bcrypt.hash(plain, 10);
};
userSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};
// 응답에서 민감 필드 제거
userSchema.methods.toSafeJSON = function () {
  return { id: this._id, username: this.username };
};

export default mongoose.model("User", userSchema);
