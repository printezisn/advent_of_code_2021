total = 0
window = []

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |num|
  window << num.to_i

  next if window.size < 4

  total += 1 if window.last(3).sum > window.first(3).sum
  window.shift
end

puts "Total: #{total}"