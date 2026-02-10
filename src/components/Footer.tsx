interface FooterProps {
    darkMode?: boolean;
}

export function Footer({ darkMode = false }: FooterProps) {
    return (
        <footer className={`mt-12 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Contact 정보 */}
                <div className="mb-4">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Contact : <a href="mailto:ktaivle@kt.com" className="hover:text-teal-600 transition">busan_help@globalfoodai.co.kr</a>
                    </p>
                </div>

                {/* 링크 영역 */}
                <div className="mb-4">
                    <div className={`flex flex-wrap items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <a href="#/policy?tab=privacy" className="hover:text-teal-600 hover:underline transition">
                            Global Food AI 개인정보 처리방침
                        </a>
                        <span className="text-gray-400">|</span>
                        <a href="#/policy?tab=terms" className="hover:text-teal-600 hover:underline transition">
                            이용약관
                        </a>
                        <span className="text-gray-400">|</span>
                        <a href="#/policy?tab=opensource" className="hover:text-teal-600 hover:underline transition">
                            오픈소스라이선스
                        </a>
                    </div>
                </div>

                {/* 회사 정보 */}
                <div className={`space-y-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    <p>(주)글로벌푸드AI 부산지사 | 부산 동구 부산진성공원로 23, 15층 | 지점장명 : 이태훈</p>
                    <p>사업자등록번호 : 617-85-39201 | 통신판매업신고 : 2026-부산-0882</p>
                    <p className="mt-2">Copyright© 2026 Global Food AI Busan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}