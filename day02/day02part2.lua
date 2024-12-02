local function isReportSafe(report)
  local direction = report[2] > report[1]
  for i = 2, #report do
    local n1 = report[i - 1]
    local n2 = report[i]
    if n1 == n2 or n2 > n1 ~= direction or math.abs(n2 - n1) < 1 or math.abs(n2 - n1) > 3 then
      return false
    end
  end
  return true
end

local count = 0

for l in io.lines("input") do
  local numbers = { l:match("(%d+) (%d+) (%d+) (%d+) (%d+) ?(%d*) ?(%d*) ?(%d*)") }
  for i = 1, #numbers do
    numbers[i] = tonumber(numbers[i])
  end
  local isSafe = isReportSafe(numbers)
  if not isSafe then
    for i = 1, #numbers do
      local test = { unpack(numbers) }
      table.remove(test, i)
      if isReportSafe(test) then
        isSafe = true
        break
      end
    end
  end
  if isSafe then
    count = count + 1
  end
end

print(count)
