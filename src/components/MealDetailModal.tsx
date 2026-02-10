import { X, AlertTriangle } from 'lucide-react';
import { MenuItem, NutritionInfo } from '../data/mealData';
import { ALLERGY_SHORT_NAMES } from '../utils/allergy';

interface MealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: 'lunch' | 'dinner';
  weekInfo: string;
  day: string;
  date: string;
  menuItems: MenuItem[];
  nutrition?: NutritionInfo;
  userAllergies: string[]; // ["대두","밀"] 또는 ["5","6"] 둘 다 대응
}

// ALLERGY_SHORT_NAMES 기반으로 이름→번호 역매핑
const allergenNumberMap: Record<string, number> = Object.fromEntries(
  Object.entries(ALLERGY_SHORT_NAMES).map(([code, name]) => [name, Number(code)])
);

function parseAllergenNumbers(raw: string | undefined): number[] {
  if (!raw) return [];

  const tokens = String(raw)
    .split(/[,.\s]+/) // 콤마/점/공백 다 대응
    .map((t) => t.trim())
    .filter(Boolean);

  const nums: number[] = [];
  for (const t of tokens) {
    // 숫자면 그대로
    if (/^\d+$/.test(t)) {
      nums.push(Number(t));
      continue;
    }
    // 한글명이면 매핑
    const mapped = allergenNumberMap[t];
    if (mapped) nums.push(mapped);
  }

  return Array.from(new Set(nums));
}

function userAllergyNumberSet(userAllergies: string[]): Set<number> {
  const s = new Set<number>();
  for (const a of userAllergies || []) {
    const t = String(a).trim();
    if (!t) continue;
    if (/^\d+$/.test(t)) s.add(Number(t));
    else {
      const mapped = allergenNumberMap[t];
      if (mapped) s.add(mapped);
    }
  }
  return s;
}

export function MealDetailModal({
  isOpen,
  onClose,
  mealType,
  weekInfo,
  day,
  date,
  menuItems,
  nutrition,
  userAllergies,
}: MealDetailModalProps) {
  if (!isOpen) return null;

  const mealTypeText = mealType === 'lunch' ? '중식' : '석식';
  const mealTypeColor = mealType === 'lunch' ? 'orange' : 'blue';

  const userNums = userAllergyNumberSet(userAllergies);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">식단 상세 정보</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-600 text-sm">
                {weekInfo} · {day}요일 ({date})
              </span>
              <span className={`bg-${mealTypeColor}-500 text-white text-xs px-3 py-1 rounded-md font-semibold`}>
                {mealTypeText}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition" aria-label="닫기">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* 메뉴 목록 */}
        <div className="px-6 py-4 space-y-3">
          <h3 className="font-semibold text-gray-800 mb-3">메뉴</h3>

          {menuItems.length > 0 ? (
            menuItems.map((item, idx) => {
              const nums = parseAllergenNumbers(item.allergens);
              const hasHit = nums.some((n) => userNums.has(n));

              return (
                <div
                  key={idx}
                  className={`border rounded-lg p-4 ${hasHit ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        {hasHit && <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                      </div>

                      {/* ✅ 삭제: 메뉴 밑 "알레르기 유발 식품: ..." 문구 */}
                    </div>

                    {/* ✅ 오른쪽 번호 뱃지: 내 알레르기 번호만 빨강 */}
                    {nums.length > 0 && (
                      <div className="flex flex-wrap gap-1 ml-2">
                        {nums.map((num) => {
                          const isHit = userNums.has(num);
                          return (
                            <span
                              key={num}
                              className={`text-xs px-2 py-1 rounded font-semibold ${
                                isHit ? 'bg-red-200 text-red-700' : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {num}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-6">메뉴 정보가 없습니다.</p>
          )}
        </div>

        {/* 영양 정보 */}
        {nutrition && (
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">영양 정보</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col items-center rounded-lg py-3 bg-orange-50">
                <span className="text-xs text-gray-500">칼로리</span>
                <span className="text-sm font-bold text-orange-600">{nutrition.calories.toLocaleString()}kcal</span>
              </div>
              <div className="flex flex-col items-center rounded-lg py-3 bg-blue-50">
                <span className="text-xs text-gray-500">탄수화물</span>
                <span className="text-sm font-bold text-blue-600">{nutrition.carbs.toLocaleString()}g</span>
              </div>
              <div className="flex flex-col items-center rounded-lg py-3 bg-green-50">
                <span className="text-xs text-gray-500">단백질</span>
                <span className="text-sm font-bold text-green-600">{nutrition.protein.toLocaleString()}g</span>
              </div>
              <div className="flex flex-col items-center rounded-lg py-3 bg-purple-50">
                <span className="text-xs text-gray-500">지방</span>
                <span className="text-sm font-bold text-purple-600">{nutrition.fat.toLocaleString()}g</span>
              </div>
            </div>
          </div>
        )}

        {/* 알레르기 표시 번호 안내 */}
        <div className="px-6 py-4 border-t border-gray-200 bg-blue-50">
          <h3 className="font-semibold text-gray-800 text-sm mb-2">알레르기 표시 번호</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            1. 난류, 2. 우유, 3. 메밀, 4. 땅콩, 5. 대두, 6. 밀, 7. 고등어, 8. 게, 9. 새우,
            10. 돼지고기, 11. 복숭아, 12. 토마토, 13. 아황산류, 14. 호두, 15. 닭고기,
            16. 쇠고기, 17. 오징어, 18. 조개류
          </p>
        </div>
      </div>
    </div>
  );
}
