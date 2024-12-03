local text = io.open("input", "r"):read("*a")
text = text:gsub("don't%(%).-do%(%)", "")
text = text:gsub("don't%(%).+$", "")

local total = 0

for a, b in text:gmatch("mul%((%d+),(%d+)%)") do
  total = total + a * b
end

print(total)
