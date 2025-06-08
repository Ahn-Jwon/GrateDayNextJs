import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-5 text-center text-sm leading-1 space-y-0">
        <p>{APP_NAME} 그레이트데이</p>
        <p>
          {APP_NAME} | 대표 임태봉 | 사업자등록번호 844-43-01065
        </p>
        <p>
          경기도 성남시 수정구 수정로220번길 11-6(신흥동) {APP_NAME}
        </p>
        <p>
          itb7032@gmail.com | 통신판매신고 제 2025-성남수정-0356
        </p>
        <p>
          Copyright ⓒ {currentYear} {APP_NAME} 그레이트데이 All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;