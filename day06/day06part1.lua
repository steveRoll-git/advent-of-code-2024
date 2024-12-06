local rows = {}
local guardX, guardY

do
  local y = 1
  for l in io.lines("input") do
    local x = l:find("%^")
    if x then
      guardX, guardY = x, y
      l = l:gsub("%^", ".")
    end
    table.insert(rows, l)
    y = y + 1
  end
end

local visited = { [guardX .. " " .. guardY] = true }
local visitedCount = 1

local mapW = #rows[1]
local mapH = #rows

local dx, dy = 0, -1

local function at(x, y)
  return rows[y]:sub(x, x)
end

while true do
  guardX = guardX + dx
  guardY = guardY + dy
  local k = guardX .. " " .. guardY
  if not visited[k] then
    visited[k] = true
    visitedCount = visitedCount + 1
  end
  if guardX + dx < 1 or guardX + dx > mapW or guardY + dy < 1 or guardY + dy > mapH then
    break
  end
  local next = at(guardX + dx, guardY + dy)
  if next == "#" then
    dx, dy = -dy, dx
  end
end

print(visitedCount)
