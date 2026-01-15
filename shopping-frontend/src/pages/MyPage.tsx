import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage: React.FC = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  // 입력 필드 상태 관리 (초기값은 현재 유저 정보)
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
  });

  // 유저 정보가 바뀔 때마다 입력창 동기화
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. 회원 정보 수정 (PUT /users/:id)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) return;

    try {
      const response = await fetch(`http://localhost:3500/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // 백엔드에서 수정된 유저 객체를 반환한다고 가정
        // Context와 로컬 스토리지의 유저 정보를 최신화합니다.
        login(data);
        alert("회원 정보가 성공적으로 수정되었습니다!");
      } else {
        alert(`수정 실패: ${data.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("서버 연결에 실패했습니다.");
    }
  };

  // 2. 계정 삭제 (DELETE /users/:id)
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "정말로 탈퇴하시겠습니까? 탈퇴 후 정보는 복구할 수 없습니다."
      )
    )
      return;

    try {
      const response = await fetch(`http://localhost:3500/users/${user?._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("계정이 삭제되었습니다. 이용해 주셔서 감사합니다.");
        logout(); // 로그아웃 처리
        navigate("/"); // 홈으로 이동
      } else {
        alert("계정 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("서버 오류로 인해 삭제하지 못했습니다.");
    }
  };

  if (!user) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500 mb-4">로그인이 필요한 페이지입니다.</p>
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 underline"
        >
          로그인하러 가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-10">내 정보 관리</h1>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* 아이디 표시 (수정 불가) */}
          <div>
            <label className="text-sm font-bold text-gray-400 block mb-2 font-mono">
              ID (Login ID)
            </label>
            <input
              type="text"
              value={user.loginId}
              disabled
              className="w-full border-none bg-gray-50 p-4 rounded-xl text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-2 ml-1">
              ※ 아이디는 변경할 수 없습니다.
            </p>
          </div>

          {/* 이름 수정 필드 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">
                First Name (이름)
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Last Name (성)</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
          >
            정보 수정하기
          </button>
        </form>

        {/* 탈퇴 영역 */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-lg font-bold text-red-600 mb-2">위험 구역</h2>
          <p className="text-sm text-gray-500 mb-4">
            계정을 삭제하면 모든 장바구니와 위시리스트 데이터가 영구적으로
            삭제됩니다.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg border border-red-100 transition"
          >
            회원 탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
