set = {}

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  num = line.to_i
  pair = 2020 - num

  if set[pair]
    puts num * pair
    break
  end

  set[num] = 1
end