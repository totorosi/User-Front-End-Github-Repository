import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

type PolicyTab = 'privacy' | 'terms' | 'opensource';

function readTabFromHash(): PolicyTab {
  const qs = window.location.hash.split('?')[1] || '';
  const params = new URLSearchParams(qs);
  const tab = params.get('tab');
  if (tab === 'terms' || tab === 'opensource') return tab;
  return 'privacy';
}

export default function PolicyPage() {
  const [tab, setTab] = useState<PolicyTab>(readTabFromHash);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash.startsWith('#/policy')) {
        setTab(readTabFromHash());
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">약관 및 정책</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs value={tab} onValueChange={(v) => setTab(v as PolicyTab)}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="privacy" className="flex-1">개인정보 처리방침</TabsTrigger>
              <TabsTrigger value="terms" className="flex-1">이용약관</TabsTrigger>
              <TabsTrigger value="opensource" className="flex-1">오픈소스라이선스</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy">
              <PrivacyContent />
            </TabsContent>
            <TabsContent value="terms">
              <TermsContent />
            </TabsContent>
            <TabsContent value="opensource">
              <OpenSourceContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

/* ── 개인정보 처리방침 ── */
function PrivacyContent() {
  return (
    <div className="space-y-6 text-gray-700">
      <div className="text-sm leading-relaxed">
        <p className="mb-4">
          AI 스마트 식단 설계 서비스(이하 "서비스")는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위해 다음과 같은 개인정보 처리방침을 수립·공개합니다.
        </p>
      </div>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제1조 (개인정보의 처리 목적)</h3>
        <div className="text-sm leading-relaxed space-y-2">
          <p>
            서비스는 다음의 목적을 위해 개인정보를 처리합니다.
            처리한 개인정보는 아래 목적 이외의 용도로는 사용되지 않으며, 목적이 변경될 경우 사전 동의를 받습니다.
          </p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>회원 가입 및 본인 확인</li>
            <li>서비스 제공 및 이용자 관리</li>
            <li>급식 운영 데이터(잔반, 만족도, 선호도) 분석을 위한 통계 처리</li>
            <li>서비스 개선, 품질 향상 및 신규 기능 개발</li>
            <li>공지사항 및 중요 안내 전달</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제2조 (처리하는 개인정보 항목)</h3>
        <div className="text-sm leading-relaxed space-y-3">
          <div>
            <p className="font-semibold text-gray-800 mb-1">① 회원가입 시</p>
            <div className="pl-3 space-y-2">
              <div>
                <p className="font-medium text-gray-700 mb-1">필수 항목</p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>이름(또는 기관명)</li>
                  <li>이메일(ID)</li>
                  <li>비밀번호</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">선택 항목</p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>소속 기관(학교, 부서 등)</li>
                  <li>직책 또는 역할(관리자, 담당자 등)</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">② 서비스 이용 과정에서 자동 수집되는 정보</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>접속 로그, IP 주소</li>
              <li>서비스 이용 기록</li>
              <li>설문 응답, 후기 텍스트 등 사용자가 입력한 데이터</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제3조 (개인정보의 처리 및 보유 기간)</h3>
        <ul className="list-disc list-inside pl-2 space-y-1 text-sm leading-relaxed">
          <li>개인정보는 수집·이용 목적이 달성될 때까지 보유·이용합니다.</li>
          <li>회원 탈퇴 시 개인정보는 지체 없이 파기됩니다.</li>
          <li>단, 관계 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제4조 (개인정보의 제3자 제공)</h3>
        <div className="text-sm leading-relaxed space-y-2">
          <p>
            서비스는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
            다만, 다음의 경우에는 예외로 합니다.
          </p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 의해 제공이 요구되는 경우</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제5조 (개인정보 처리의 위탁)</h3>
        <p className="text-sm leading-relaxed">
          서비스는 원활한 운영을 위해 개인정보 처리 업무의 일부를 외부에 위탁할 수 있습니다.
          이 경우 위탁 대상자와 위탁 업무 내용은 서비스 내 공지 또는 본 방침을 통해 안내합니다.
        </p>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제6조 (정보주체의 권리·의무 및 행사 방법)</h3>
        <div className="text-sm leading-relaxed space-y-2">
          <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>개인정보 열람 요청</li>
            <li>개인정보 정정·삭제 요청</li>
            <li>개인정보 처리 정지 요청</li>
          </ul>
          <p>권리 행사는 서비스 내 문의 기능 또는 운영자 이메일을 통해 요청할 수 있습니다.</p>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제7조 (개인정보의 파기 절차 및 방법)</h3>
        <ul className="list-disc list-inside pl-2 space-y-1 text-sm leading-relaxed">
          <li>개인정보는 처리 목적이 달성된 후 지체 없이 파기합니다.</li>
          <li>전자적 파일 형태의 정보는 복구 불가능한 방법으로 삭제합니다.</li>
          <li>종이 문서 형태의 정보는 분쇄 또는 소각을 통해 파기합니다.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제8조 (개인정보의 안전성 확보 조치)</h3>
        <div className="text-sm leading-relaxed space-y-2">
          <p>서비스는 개인정보 보호를 위해 다음과 같은 조치를 취하고 있습니다.</p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>접근 권한 관리 및 최소화</li>
            <li>개인정보 처리 시스템 접근 기록 관리</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제9조 (개인정보 보호책임자)</h3>
        <div className="text-sm leading-relaxed space-y-1">
          <p>개인정보 보호 관련 문의는 아래 담당자에게 연락할 수 있습니다.</p>
          <p className="pl-2">개인정보 보호책임자: 김철수</p>
          <p className="pl-2">연락처: 1234@123.com</p>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제10조 (개인정보 처리방침의 변경)</h3>
        <p className="text-sm leading-relaxed">
          본 개인정보 처리방침은 법령 또는 서비스 정책 변경에 따라 수정될 수 있으며,
          변경 시 서비스 내 공지사항을 통해 사전 또는 즉시 공지합니다.
        </p>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">부칙</h3>
        <p className="text-sm leading-relaxed">
          본 개인정보 처리방침은 정식 서비스 시작시부터 적용됩니다.
        </p>
      </section>
    </div>
  );
}

/* ── 이용약관 ── */
function TermsContent() {
  return (
    <div className="space-y-6 text-gray-700">
      <section>
        <h3 className="font-bold text-gray-800 mb-2">제1조 (약관의 목적)</h3>
        <p className="text-sm leading-relaxed">
          본 약관은 AI 스마트 식단 설계 서비스(이하 "서비스")가 제공하는 서비스 이용과 관련하여 회원과 서비스 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제2조 (회원가입 및 이용계약 체결)</h3>
        <div className="text-sm leading-relaxed space-y-2">
          <p>회원은 본 약관 및 개인정보 처리방침에 동의함으로써 회원가입을 신청할 수 있습니다.</p>
          <p>서비스는 회원가입 신청에 대해 승낙함으로써 이용계약이 체결됩니다.</p>
          <p>만 14세 미만의 경우 법정대리인의 동의가 필요할 수 있습니다.</p>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제3조 (수집하는 개인정보 항목)</h3>
        <p className="text-sm leading-relaxed mb-3">
          서비스는 원활한 운영을 위해 아래의 개인정보를 수집할 수 있습니다.
        </p>
        <div className="text-sm leading-relaxed space-y-3">
          <div>
            <p className="font-semibold text-gray-800 mb-1">필수항목</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>이름(또는 기관명)</li>
              <li>아이디(이메일)</li>
              <li>비밀번호</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">선택항목</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>소속 기관 정보</li>
              <li>서비스 이용 관련 입력 데이터(설문, 후기 등)</li>
            </ul>
          </div>
          <p className="text-xs text-gray-600">
            ※ 서비스 이용 과정에서 자동 생성되는 로그 데이터가 수집될 수 있습니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제4조 (개인정보의 이용 목적)</h3>
        <p className="text-sm leading-relaxed mb-2">
          수집된 개인정보는 다음 목적에 한하여 이용됩니다.
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1 text-sm">
          <li>회원 식별 및 본인 확인</li>
          <li>서비스 제공 및 운영 관리</li>
          <li>잔반 데이터, 만족도, 선호도 분석을 위한 통계 처리</li>
          <li>서비스 개선 및 신규 기능 개발</li>
          <li>공지사항 및 중요 안내 전달</li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제5조 (개인정보 보관 및 이용 기간)</h3>
        <div className="text-sm leading-relaxed space-y-2">
          <p>회원 탈퇴 시 개인정보는 지체 없이 파기됩니다.</p>
          <p>단, 관계 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관될 수 있습니다.</p>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제6조 (회원의 의무)</h3>
        <ul className="list-disc list-inside pl-2 space-y-1 text-sm">
          <li>회원은 정확한 정보를 제공해야 합니다.</li>
          <li>타인의 정보를 도용하거나 부정한 목적으로 서비스를 이용해서는 안 됩니다.</li>
          <li>서비스 운영을 방해하는 행위를 해서는 안 됩니다.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제7조 (서비스의 변경 및 중단)</h3>
        <div className="text-sm leading-relaxed space-y-2">
          <p>서비스는 운영상 또는 기술상의 필요에 따라 서비스 내용을 변경할 수 있습니다.</p>
          <p>서비스 중단이 발생할 경우 사전에 공지함을 원칙으로 합니다.</p>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제8조 (책임의 제한)</h3>
        <p className="text-sm leading-relaxed">
          서비스는 천재지변, 시스템 장애 등 불가항력적인 사유로 인한 서비스 제공 불가에 대해 책임을 지지 않습니다.
        </p>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제9조 (약관의 변경)</h3>
        <div className="text-sm leading-relaxed space-y-2">
          <p>본 약관은 관련 법령을 위배하지 않는 범위에서 변경될 수 있습니다.</p>
          <p>변경 시 서비스 내 공지사항을 통해 사전 공지합니다.</p>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-2">제10조 (분쟁 해결 및 관할 법원)</h3>
        <p className="text-sm leading-relaxed">
          본 약관과 관련된 분쟁은 대한민국 법을 따르며, 관할 법원은 서비스 운영자의 본점 소재지를 따릅니다.
        </p>
      </section>
    </div>
  );
}

/* ── 오픈소스라이선스 ── */
function OpenSourceContent() {
  const packages = [
    { name: 'React', version: '18.3.1', license: 'MIT', url: 'https://github.com/facebook/react' },
    { name: 'React DOM', version: '18.3.1', license: 'MIT', url: 'https://github.com/facebook/react' },
    { name: 'Vite', version: '6.3.5', license: 'MIT', url: 'https://github.com/vitejs/vite' },
    { name: 'Tailwind CSS', version: '4.1.3', license: 'MIT', url: 'https://github.com/tailwindlabs/tailwindcss' },
    { name: 'Radix UI', version: '-', license: 'MIT', url: 'https://github.com/radix-ui/primitives' },
    { name: 'Lucide React', version: '0.487.0', license: 'ISC', url: 'https://github.com/lucide-icons/lucide' },
    { name: 'Recharts', version: '2.15.2', license: 'MIT', url: 'https://github.com/recharts/recharts' },
    { name: 'React Hook Form', version: '7.55.0', license: 'MIT', url: 'https://github.com/react-hook-form/react-hook-form' },
    { name: 'Sonner', version: '2.0.3', license: 'MIT', url: 'https://github.com/emilkowalski/sonner' },
    { name: 'cmdk', version: '1.1.1', license: 'MIT', url: 'https://github.com/pacocoursey/cmdk' },
    { name: 'class-variance-authority', version: '0.7.1', license: 'Apache-2.0', url: 'https://github.com/joe-bell/cva' },
    { name: 'clsx', version: '-', license: 'MIT', url: 'https://github.com/lukeed/clsx' },
    { name: 'tailwind-merge', version: '-', license: 'MIT', url: 'https://github.com/dcastil/tailwind-merge' },
    { name: 'Embla Carousel', version: '8.6.0', license: 'MIT', url: 'https://github.com/davidjerleke/embla-carousel' },
    { name: 'React Day Picker', version: '8.10.1', license: 'MIT', url: 'https://github.com/gpbl/react-day-picker' },
    { name: 'React Zoom Pan Pinch', version: '-', license: 'MIT', url: 'https://github.com/BetterTyped/react-zoom-pan-pinch' },
    { name: 'React Resizable Panels', version: '2.1.7', license: 'MIT', url: 'https://github.com/bvaughn/react-resizable-panels' },
    { name: 'Vaul', version: '1.1.2', license: 'MIT', url: 'https://github.com/emilkowalski/vaul' },
    { name: 'input-otp', version: '1.4.2', license: 'MIT', url: 'https://github.com/guilhermerodz/input-otp' },
    { name: 'next-themes', version: '0.4.6', license: 'MIT', url: 'https://github.com/pacocoursey/next-themes' },
  ];

  return (
    <div className="space-y-6 text-gray-700">
      <div className="text-sm leading-relaxed">
        <p>
          본 서비스는 아래의 오픈소스 소프트웨어를 사용하고 있습니다.
          각 소프트웨어의 저작권 및 라이선스 조건은 해당 프로젝트의 라이선스를 따릅니다.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2 pr-4 font-semibold text-gray-800">패키지</th>
              <th className="text-left py-2 pr-4 font-semibold text-gray-800">버전</th>
              <th className="text-left py-2 font-semibold text-gray-800">라이선스</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.name} className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  <a
                    href={pkg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline"
                  >
                    {pkg.name}
                  </a>
                </td>
                <td className="py-2 pr-4 text-gray-500">{pkg.version}</td>
                <td className="py-2 text-gray-600">{pkg.license}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-500 leading-relaxed space-y-2">
        <p>
          위 목록은 주요 의존성만 포함하고 있으며, 전체 의존성 트리에 포함된 패키지는 이보다 많을 수 있습니다.
        </p>
        <p>
          MIT 라이선스: Permission is hereby granted, free of charge, to any person obtaining a copy of this software
          and associated documentation files, to deal in the Software without restriction, including without limitation
          the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
          subject to the following conditions: The above copyright notice and this permission notice shall be included
          in all copies or substantial portions of the Software.
        </p>
        <p>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.
        </p>
      </div>
    </div>
  );
}
